import React from "react";
import { useNavigate, Link } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "./hooks/useAuth";
import { Button } from "@/components/ui/button";
import { FormInput } from "../../shared/components/forms";
import { registerSchema } from "./schemas/auth.schema";
import { ROUTES } from "../../shared/constants";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const methods = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  const { handleSubmit, setError, formState: { isSubmitting } } = methods;
  
  const onSubmit = async (data) => {
    try {
      const result = await register(
        data.email,
        data.password,
        data.name
      );

      if (result.success) {
        navigate(ROUTES.DASHBOARD);
      } else {
        setError("root", {
          type: "manual",
          message: result.error || "Registration failed",
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
          <h2 className="text-3xl font-bold text-gray-900">Create an account</h2>
          <p className="mt-2 text-gray-600">Join us to get started</p>
        </div>

        {/* Register Card */}
        <div className="card p-8">
          {methods.formState.errors.root && (
            <div className="error-message mb-6 animate-fade-in">
              {methods.formState.errors.root.message}
            </div>
          )}

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormInput
                name="name"
                label="Full Name"
                placeholder="John Doe"
                autoComplete="name"
                icon={
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              />

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
                autoComplete="new-password"
                showPasswordToggle
                icon={
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              />

              <FormInput
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="••••••••"
                autoComplete="new-password"
                showPasswordToggle
                icon={
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                }
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loading-spinner"></span>
                    Creating account...
                  </span>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>
          </FormProvider>

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">Already have an account? </span>
            <Link to={ROUTES.LOGIN} className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;