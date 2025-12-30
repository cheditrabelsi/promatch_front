import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppWrapper from "./AppWrapper";
import { useAuth } from "./providers";
import HomePage1 from "./pages/HomePage1";
import JobDetail from "./pages/JobDetail";

const LoginPage = lazy(() => import("@/pages/AuthPages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/AuthPages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/AuthPages/ForgotPasswordPage"));
const MyJobsPage = lazy(() => import("@/pages/MyJobsPage"));
const SavedJobsPage = lazy(() => import("@/pages/SavedJobsPage"));
const MessagesPage = lazy(() => import("@/pages/MessagesPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));

// Ajoute tes nouvelles pages :
const AboutUsPage = lazy(() => import("@/pages/AboutUsPage"));
const ContactUsPage = lazy(() => import("@/pages/ContactUsPage"));

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <Routes>
          <Route path="/" element={<AppWrapper />}>
            <Route index element={<HomePage1 />} />
            <Route path="/my-jobs" element={<MyJobsPage />} />
            <Route path="/saved-jobs" element={<SavedJobsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
            <Route path="/forgot-password" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<AppWrapper />}>
            <Route index element={<HomePage1 />} />
            <Route path="/my-jobs" element={<MyJobsPage />} />
          <Route path="/job/:id" element={<JobDetail />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}
export default App;
