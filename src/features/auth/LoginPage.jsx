import React from "react";
import { useNavigate, Link } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "./hooks/useAuth";
import { Button } from "@/components/ui/button";
import { FormInput } from "../../shared/components/forms";
import { loginSchema } from "./schemas/auth.schema";
import { ROUTES } from "../../shared/constants";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const { handleSubmit, setError, formState: { isSubmitting } } = methods;
  
  const onSubmit = async (data) => {
    try {
      const result = await login(data.email, data.password);

      if (result.success) {
        navigate(ROUTES.DASHBOARD);
      } else {
        setError("root", {
          type: "manual",
          message: result.error || "Login failed",
        });
      }
    } catch {
      setError("root", {
        type: "manual",
        message: "An unexpected error occurred",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg mb-4">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-gray-600">Sign in to your account to continue</p>
        </div>

        {/* Login Card */}
        <div className="card p-8">
          {methods.formState.errors.root && (
            <div className="error-message mb-6 animate-fade-in">
              {methods.formState.errors.root.message}
            </div>
          )}

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormInput
                name="email"
                type="email"
                label="Email address"
                placeholder="you@example.com"
                autoComplete="email"
                icon={
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                }
              />

              <FormInput
                name="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                autoComplete="current-password"
                showPasswordToggle
                icon={
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              />

              <div className="flex items-center justify-end">
                <Link to={ROUTES.FORGOT_PASSWORD} className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loading-spinner"></span>
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </FormProvider>

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">Don't have an account? </span>
            <Link to={ROUTES.REGISTER} className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
              Sign up
            </Link>
          </div>

          {/* Demo credentials hint */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              <span className="font-medium">Demo credentials:</span><br />
              Admin: admin@example.com / Admin123!<br />
              User: user@example.com / User123!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;