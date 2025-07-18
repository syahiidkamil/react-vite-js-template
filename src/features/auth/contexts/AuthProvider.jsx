import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import AuthService from "../services/AuthService";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in by calling the API
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await AuthService.getCurrentUser();
      setUser(userData);
    } catch {
      // User is not authenticated - this is normal for first load
      // Don't trigger refresh token logic here
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await AuthService.login(email, password);
      setUser(response.user);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (email, password, name) => {
    try {
      const response = await AuthService.register(email, password, name);
      setUser(response.user);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, clear local user state
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
