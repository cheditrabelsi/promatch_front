// src/forms/auth/LoginForm/useLoginForm.ts
import { ILoginPayload, ILoginResponse } from '@/interfaces/models';
import { useAuth } from '@/providers';
import useAuthStore from '@/stores/auth.store';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const FORM_INITIAL_VALUES = {
  email: '',
  password: '',
};

const useLoginForm = () => {
  const { login: setLogin } = useAuth();
  const navigate = useNavigate();

  const { loginError, login, clearLoginError } = useAuthStore((state) => ({
    login: state.login,
    loginError: state.loginError,
    clearLoginError: state.clearLoginError,
  }));

  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email address'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must be at most 20 characters'),
  });

  const form = useFormik({
    initialValues: FORM_INITIAL_VALUES,
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);

        const payload: ILoginPayload = {
          email: values.email,
          password: values.password,
        };

        /* appel API */
        const loginResponse: ILoginResponse = await login(payload);

        /* extraction token + user */
        const token = loginResponse.tokens.access;
        const user  = loginResponse.user;

        /* connexion côté React */
        setLogin(token, user);

        form.resetForm();
        navigate('/profile');
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    return () => {
      clearLoginError();
    };
  }, [clearLoginError]);

  return {
    form,
    loginError,
  };
};

export default useLoginForm;