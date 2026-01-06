// src/forms/auth/LoginForm/useLoginForm.ts
import { ILoginPayload, ILoginResponse } from '@/interfaces/models';
import { useAuth } from '@/providers';
import useAuthStore from '@/stores/auth.store';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { jwtDecode } from "jwt-decode";

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

    // 🔹 appel API
    const loginResponse: ILoginResponse = await login(payload);

    // 🔴 PROTECTION (évite tout crash)
    if (!loginResponse || !loginResponse.access) {
      throw new Error("Réponse login invalide");
    }

    // 🔹 récupérer l'utilisateur depuis la réponse (fallback sur le token)
    const user = loginResponse.user || jwtDecode(loginResponse.access);

    // 🔹 stocker tokens
    localStorage.setItem(
      "authTokens",
      JSON.stringify(loginResponse)
    );

    // 🔹 connexion côté React
    setLogin(loginResponse.access, user);

    form.resetForm();
    const isRecruiter = Boolean((user as any)?.is_recruiter);
    const isAdmin = Boolean((user as any)?.is_staff);
    const target = isAdmin ? "/admin" : isRecruiter ? "/dashboard" : "/";
    navigate(target);
  } catch (error) {
    console.error("Login error:", error);
  } finally {
    setSubmitting(false);
  }
},});

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
