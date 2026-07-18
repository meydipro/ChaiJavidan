import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_BASE = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('customerToken') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) { setLoading(false); return; }
      try {
        const res = await axios.get(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.user.role === 'user') {
          setUser(res.data.user);
          setIsAuthenticated(true);
        } else {
          logout();
        }
      } catch {
        logout();
      }
      setLoading(false);
    };
    checkAuth();
  }, [token]);

  const register = async (data) => {
    const res = await axios.post(`${API_BASE}/auth/register`, data);
    return res.data;
  };

  const verifyOTP = async (tempToken, otp) => {
    const res = await axios.post(`${API_BASE}/auth/verify-otp`, { tempToken, otp });
    const { token: newToken, user: newUser } = res.data;
    localStorage.setItem('customerToken', newToken);
    setToken(newToken);
    setUser(newUser);
    setIsAuthenticated(true);
    return newUser;
  };

  const resendOTP = async (tempToken) => {
    const res = await axios.post(`${API_BASE}/auth/resend-otp`, { tempToken });
    return res.data;
  };

  const login = async (identifier, password) => {
    const res = await axios.post(`${API_BASE}/auth/customer-login`, { identifier, password });
    const { token: newToken, user: newUser } = res.data;
    localStorage.setItem('customerToken', newToken);
    setToken(newToken);
    setUser(newUser);
    setIsAuthenticated(true);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem('customerToken');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const forgotPassword = async (identifier) => {
    const res = await axios.post(`${API_BASE}/auth/forgot-password`, { identifier });
    return res.data;
  };

  const resetPassword = async (tempToken, otp, newPassword) => {
    const res = await axios.post(`${API_BASE}/auth/reset-password`, { tempToken, otp, newPassword });
    return res.data;
  };

  return (
    <AuthContext.Provider value={{
      user, isAuthenticated, token, loading,
      register, verifyOTP, resendOTP, login, logout, forgotPassword, resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};
