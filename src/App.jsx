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
  <div className="space-y-6">
    <div className="page-header">
      <h1 className="page-title">Dashboard</h1>
      <p className="page-description">Welcome to your admin dashboard</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Stats Cards */}
      <div className="card hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-gray-900">2</span>
        </div>
        <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
        <p className="text-xs text-gray-500 mt-1">Active system users</p>
      </div>

      <div className="card hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-gray-900">100%</span>
        </div>
        <h3 className="text-sm font-medium text-gray-600">System Status</h3>
        <p className="text-xs text-gray-500 mt-1">All systems operational</p>
      </div>

      <div className="card hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-gray-900">24/7</span>
        </div>
        <h3 className="text-sm font-medium text-gray-600">Uptime</h3>
        <p className="text-xs text-gray-500 mt-1">System availability</p>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="card">
      <h2 className="card-title mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="/users" className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Add New User</h3>
            <p className="text-sm text-gray-500">Create a new user account</p>
          </div>
        </a>
        
        <a href="/users" className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Manage Users</h3>
            <p className="text-sm text-gray-500">View and edit user accounts</p>
          </div>
        </a>
      </div>
    </div>
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