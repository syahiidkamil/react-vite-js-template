import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { useAuth } from "../../shared/hooks/useAuth";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the previous location or use dashboard as default
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Dummy login
    try {
      const userData = {
        id: 1,
        name: email.split("@")[0], // Use part of email as name for demo
        email,
      };

      login(userData);
      navigate(from, { replace: true });
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-6">
          Login to your account
        </h1>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Your email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Your password"
            />
          </div>

          <Button variant="default" type="submit" className="w-full">
            Sign In
          </Button>
        </form>

        <div className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-700">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
