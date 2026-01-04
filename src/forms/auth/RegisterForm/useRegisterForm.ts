// src/forms/auth/RegisterForm/useRegisterForm.ts
import { IRegisterPayload } from '@/interfaces/models';
import useAuthStore from '@/stores/auth.store';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const FORM_INITIAL_VALUES = {
  user_type: 'candidate', 
  first_name: '',
  last_name: '',        // 'candidate' | 'recruiter'
  email: '',
  password: '',
  confirmPassword: '',
  company_name: '',               // ← ajouté
  termsConditions: false,
};

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const {
    registerSuccessMessage,
    registerErrorMessage,
    termsConditionsModalOpen,
    setTermsConditionsModalOpen,
    register,
    clearRegisterMessages,
  } = useAuthStore((s) => s);

  const validationSchema = Yup.object({
    user_type: Yup.string()
      .required('Le type de compte est requis')
      .oneOf(['candidate', 'recruiter'], 'Type de compte invalide'),
    first_name: Yup.string()
      .required('Le prénom est requis')
      .min(2, 'Le prénom doit contenir au moins 2 caractères')
      .max(50, 'Le prénom est trop long'),

    last_name: Yup.string()
      .required('Le nom est requis')
      .min(2, 'Le nom doit contenir au moins 2 caractères')
      .max(50, 'Le nom est trop long'),
    email: Yup.string()
      .required('L\'email est requis')
      .email('Adresse email invalide'),

    password: Yup.string()
      .required('Le mot de passe est requis')
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
      .max(20, 'Le mot de passe ne doit pas dépasser 20 caractères'),

    confirmPassword: Yup.string()
      .required('La confirmation du mot de passe est requise')
      .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas'),

    company_name: Yup.string().when('user_type', {
      is: 'recruiter',
      then: (schema) =>
        schema
          .required('Le nom de l\'entreprise est requis pour un recruteur')
          .min(2, 'Le nom doit contenir au moins 2 caractères')
          .max(100, 'Le nom est trop long'),
      otherwise: (schema) => schema.nullable().default(''),
    }),

    termsConditions: Yup.boolean().oneOf(
      [true],
      'Vous devez accepter les conditions d\'utilisation'
    ),
  });

  const form = useFormik({
    initialValues: FORM_INITIAL_VALUES,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,

    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        setSubmitting(true);

       const payload: IRegisterPayload = {
          first_name: values.first_name.trim(),
          last_name: values.last_name.trim(),
          email: values.email.trim(),
          password: values.password,
          is_candidate: values.user_type === 'candidate',
          is_recruiter: values.user_type === 'recruiter',
          ...(values.user_type === 'recruiter' && values.company_name.trim()
            ? { company_name: values.company_name.trim() }
            : {}),
        };

        console.log('Payload envoyé au backend :', payload);

        await register(payload);

        form.resetForm();
        navigate('/login');

      } catch (error: any) {
        console.error('Erreur inscription :', error);

       

      } finally {
        setSubmitting(false);
      }
    },
  });

  const openTerms = () => setTermsConditionsModalOpen(true);
  const closeTerms = () => setTermsConditionsModalOpen(false);

  useEffect(() => {
    clearRegisterMessages();
  }, [clearRegisterMessages]);

  return {
    form,
    registerSuccessMessage,
    registerErrorMessage,
    termsConditionsModalOpen,
    openTerms,
    closeTerms,
  };
};