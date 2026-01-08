import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppWrapper from "./AppWrapper";
import { useAuth } from "./providers";
import HomePage1 from "./pages/HomePage1";
import JobDetail from "./pages/JobDetail";
import AboutUs from "./pages/AboutUs";
import SuspenseLoader from "./components/loaders/SuspenseLoader";
const LoginPage = lazy(() => import("@/pages/AuthPages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/AuthPages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/AuthPages/ForgotPasswordPage"));
const MyJobsPage = lazy(() => import("@/pages/MyJobsPage"));
const SavedJobsPage = lazy(() => import("@/pages/SavedJobsPage"));
const MessagesPage = lazy(() => import("@/pages/MessagesPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const UploadResumePage = lazy(() => import("@/pages/UploadResumePage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const CandidatePage = lazy(() => import("@/pages/CandidatePage"));
const AdminPage = lazy(() => import("@/pages/AdminPage"));

// Ajoute tes nouvelles pages :
const AboutUsPage = lazy(() => import("@/pages/AboutUsPage"));
const ContactUsPage = lazy(() => import("@/pages/ContactUsPage"));

const RecruiterRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user) return <SuspenseLoader />;
  if (!user.is_recruiter) return <Navigate to="/" replace />;

  return children;
};

const CandidateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user) return <SuspenseLoader />;
  if (!user.is_candidate) return <Navigate to="/" replace />;

  return children;
};

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user) return <SuspenseLoader />;
  if (!user.is_staff) return <Navigate to="/" replace />;

  return children;
};

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
            <Route path="/job/:id" element={<JobDetail />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route
              path="/dashboard"
              element={
                <RecruiterRoute>
                  <DashboardPage />
                </RecruiterRoute>
              }
            />
            <Route
              path="/candidate"
              element={
                <CandidateRoute>
                  <CandidatePage />
                </CandidateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              }
            />
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
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/upload-resume" element={<UploadResumePage/>} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}
export default App;
