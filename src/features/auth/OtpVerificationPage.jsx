import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { Button } from "@/components/ui/button";
import authService from "./services/auth.service";

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get email from navigation state
    const stateEmail = location.state?.email;
    if (stateEmail) {
      setEmail(stateEmail);
    } else {
      // If no email in state, redirect back to forgot password
      navigate('/forgot-password');
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    setLoading(true);
    
    try {
      const response = await authService.verifyOtp(email, otp);
      
      // Navigate to reset password page with reset token
      navigate('/reset-password', { 
        state: { 
          email, 
          resetToken: response.resetToken 
        } 
      });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setLoading(true);
    
    try {
      await authService.forgotPassword(email);
      alert("New OTP sent to your email!");
    } catch (err) {
      setError("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-6">
          Verify OTP
        </h1>
        
        <p className="text-gray-600 text-center mb-6">
          Enter the 6-digit OTP sent to {email}
        </p>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="otp">
              OTP Code
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={handleOtpChange}
              className="w-full px-3 py-2 border border-gray-300 rounded text-center text-lg font-mono"
              placeholder="000000"
              disabled={loading}
              maxLength="6"
            />
            <p className="text-xs text-gray-500 mt-2">
              Check your console for the OTP in development mode
            </p>
          </div>

          <Button 
            variant="default" 
            type="submit" 
            className="w-full" 
            disabled={loading || otp.length !== 6}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleResendOtp}
            className="text-blue-500 hover:text-blue-700"
            disabled={loading}
          >
            Resend OTP
          </button>
        </div>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-gray-500 hover:text-gray-700">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationPage;