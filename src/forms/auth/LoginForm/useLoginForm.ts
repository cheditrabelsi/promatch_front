import { ILoginPayload, ILoginResponse } from '@/interfaces/models';
import { jwtDecode } from "jwt-decode";
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

    // 🔹 appel API
   const loginResponse: ILoginResponse = await login(payload);

if (!loginResponse || !loginResponse.access) {
  throw new Error("Réponse login invalide");
}

interface JwtPayload {
  user_id: number;
  email: string;
  exp: number;
  iat: number;
}

const user = jwtDecode<JwtPayload>(loginResponse.access);

localStorage.setItem(
  "authTokens",
  JSON.stringify(loginResponse)
);

setLogin(loginResponse.access, user);
    form.resetForm();
    navigate("/profile");
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