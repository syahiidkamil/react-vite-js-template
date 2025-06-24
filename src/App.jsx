import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthProvider } from "./shared/contexts/AuthProvider";
import ProtectedRoute from "./shared/routes/ProtectedRoute";
import PublicRoute from "./shared/routes/PublicRoute";
import DashboardLayout from "./shared/components/DashboardLayout";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import ForgotPasswordPage from "./features/auth/ForgotPasswordPage";
import OtpVerificationPage from "./features/auth/OtpVerificationPage";
import ResetPasswordPage from "./features/auth/ResetPasswordPage";
import NotFoundPage from "./features/not-found/NotFoundPage";
import UsersListPage from "./features/users/UsersListPage";
import UserCreatePage from "./features/users/UserCreatePage";
import UserEditPage from "./features/users/UserEditPage";
import UserDetailPage from "./features/users/UserDetailPage";

// Dashboard Home Page Component
const DashboardHomePage = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Dashboard</h1>
    <p className="text-gray-600">Select an option from the sidebar to get started.</p>
  </div>
);

// Route configuration array
const routesConfig = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <DashboardHomePage />,
      },
      {
        path: "users",
        element: <UsersListPage />,
      },
      {
        path: "users/new",
        element: <UserCreatePage />,
      },
      {
        path: "users/:id",
        element: <UserDetailPage />,
      },
      {
        path: "users/:id/edit",
        element: <UserEditPage />,
      },
      {
        index: true,
        element: <DashboardHomePage />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <PublicRoute>
        <ForgotPasswordPage />
      </PublicRoute>
    ),
  },
  {
    path: "/verify-otp",
    element: (
      <PublicRoute>
        <OtpVerificationPage />
      </PublicRoute>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <PublicRoute>
        <ResetPasswordPage />
      </PublicRoute>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

// Create the router from the routes configuration
const router = createBrowserRouter(routesConfig);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;