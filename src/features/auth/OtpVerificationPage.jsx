import React, { useEffect, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormInput } from "../../shared/components/forms";
import { otpSchema } from "./schemas/auth.schema";
import AuthService from "./services/AuthService";
import { ROUTES } from "../../shared/constants";

const OtpVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = React.useState("");
  const [resending, setResending] = React.useState(false);
  
  const methods = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });
  
  const { handleSubmit, setError, setValue, watch, formState: { isSubmitting } } = methods;
  const otpValue = watch("otp");
  
  useEffect(() => {
    // Get email from navigation state
    const stateEmail = location.state?.email;
    if (stateEmail) {
      setEmail(stateEmail);
    } else {
      // If no email in state, redirect back to forgot password
      navigate(ROUTES.FORGOT_PASSWORD);
    }
  }, [location, navigate]);
  
  // Custom onChange to only allow digits
  const handleOtpChange = useCallback((e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 6) {
      setValue("otp", value);
    }
  }, [setValue]);
  
  const onSubmit = async (data) => {
    try {
      const response = await AuthService.verifyOtp(email, data.otp);
      
      // Navigate to reset password page with reset token
      navigate(ROUTES.RESET_PASSWORD, { 
        state: { 
          email, 
          resetToken: response.resetToken 
        } 
      });
    } catch (err) {
      setError("root", {
        type: "manual",
        message: err.response?.data?.message || "Invalid OTP",
      });
    }
  };
  
  const handleResendOtp = async () => {
    setResending(true);
    
    try {
      await AuthService.forgotPassword(email);
      alert("New OTP sent to your email!");
    } catch {
      setError("root", {
        type: "manual",
        message: "Failed to resend OTP",
      });
    } finally {
      setResending(false);
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
          <h2 className="text-3xl font-bold text-gray-900">Verify OTP</h2>
          <p className="mt-2 text-gray-600">Enter the 6-digit code sent to {email}</p>
        </div>

        <div className="card p-8">
          {methods.formState.errors.root && (
            <div className="error-message mb-6 animate-fade-in">
              {methods.formState.errors.root.message}
            </div>
          )}

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="form-group">
                <label className="form-label" htmlFor="otp">
                  OTP Code
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otpValue}
                  onChange={handleOtpChange}
                  className="form-input text-center text-2xl font-mono tracking-widest"
                  placeholder="000000"
                  disabled={isSubmitting}
                  maxLength="6"
                  autoComplete="one-time-code"
                />
                {methods.formState.errors.otp && (
                  <p className="mt-1 text-sm text-red-600">{methods.formState.errors.otp.message}</p>
                )}
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Check your console for the OTP in development mode
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting || otpValue.length !== 6}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loading-spinner"></span>
                    Verifying...
                  </span>
                ) : (
                  "Verify OTP"
                )}
              </Button>
            </form>
          </FormProvider>

          <div className="mt-6 flex flex-col items-center gap-2">
            <button
              onClick={handleResendOtp}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors disabled:opacity-50"
              disabled={isSubmitting || resending}
            >
              {resending ? "Resending..." : "Resend OTP"}
            </button>
            
            <Link to={ROUTES.LOGIN} className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationPage;