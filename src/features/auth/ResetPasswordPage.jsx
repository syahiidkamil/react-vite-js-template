import React, { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormInput } from "../../shared/components/forms";
import { resetPasswordSchema } from "./schemas/auth.schema";
import AuthService from "./services/AuthService";
import { ROUTES } from "../../shared/constants";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = React.useState("");
  const [resetToken, setResetToken] = React.useState("");
  
  const methods = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  
  const { handleSubmit, setError, formState: { isSubmitting } } = methods;
  
  useEffect(() => {
    // Get email and reset token from navigation state
    const stateEmail = location.state?.email;
    const stateToken = location.state?.resetToken;
    
    if (stateEmail && stateToken) {
      setEmail(stateEmail);
      setResetToken(stateToken);
    } else {
      // If no state, redirect to forgot password
      navigate(ROUTES.FORGOT_PASSWORD);
    }
  }, [location, navigate]);
  
  const onSubmit = async (data) => {
    try {
      await AuthService.resetPassword(email, resetToken, data.password);
      
      // Show success message and redirect to login
      alert("Password reset successful! Please login with your new password.");
      navigate(ROUTES.LOGIN);
    } catch (err) {
      setError("root", {
        type: "manual",
        message: err.response?.data?.message || "Failed to reset password",
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
          <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
          <p className="mt-2 text-gray-600">Enter your new password for {email}</p>
        </div>

        <div className="card p-8">
          {methods.formState.errors.root && (
            <div className="error-message mb-6 animate-fade-in">
              {methods.formState.errors.root.message}
            </div>
          )}

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormInput
                name="password"
                type="password"
                label="New Password"
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
                label="Confirm New Password"
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
                    Resetting...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </FormProvider>

          <div className="mt-6 text-center">
            <Link to={ROUTES.LOGIN} className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;