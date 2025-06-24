import React from "react";
import { useNavigate, Link } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormInput } from "../../shared/components/forms";
import { forgotPasswordSchema } from "./schemas/auth.schema";
import authService from "./services/auth.service";
import { ROUTES } from "../../shared/constants";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  
  const methods = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  
  const { handleSubmit, setError, formState: { isSubmitting } } = methods;
  const [successMessage, setSuccessMessage] = React.useState("");
  
  const onSubmit = async (data) => {
    setSuccessMessage("");
    
    try {
      const response = await authService.forgotPassword(data.email);
      setSuccessMessage(response.message || "OTP sent successfully!");
      
      // Navigate to OTP verification page after 2 seconds
      setTimeout(() => {
        navigate(ROUTES.VERIFY_OTP, { state: { email: data.email } });
      }, 2000);
    } catch (err) {
      setError("root", {
        type: "manual",
        message: err.response?.data?.message || "Failed to send OTP",
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
          <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
          <p className="mt-2 text-gray-600">Enter your email to receive a verification code</p>
        </div>

        <div className="card p-8">
          {methods.formState.errors.root && (
            <div className="error-message mb-6 animate-fade-in">
              {methods.formState.errors.root.message}
            </div>
          )}
          
          {successMessage && (
            <div className="success-message mb-6 animate-fade-in">
              {successMessage}
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

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loading-spinner"></span>
                    Sending OTP...
                  </span>
                ) : (
                  "Send OTP"
                )}
              </Button>
            </form>
          </FormProvider>

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">Remember your password? </span>
            <Link to={ROUTES.LOGIN} className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;