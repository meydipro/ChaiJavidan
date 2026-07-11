import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

const API_BASE = 'http://localhost:5001/api';

export const AdminProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('adminToken') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        const res = await axios.get(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data.user);
        setIsAdmin(res.data.user.role === 'admin');
      } catch (error) {
        localStorage.removeItem('adminToken');
        setToken(null);
      }
      setLoading(false);
    };
    
    checkAuth();
  }, [token]);

  const login = async (email, password) => {
    const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
    const { token: newToken, user: newUser } = res.data;
    
    localStorage.setItem('adminToken', newToken);
    setToken(newToken);
    setUser(newUser);
    setIsAdmin(newUser.role === 'admin');
    return newUser;
  };

  const googleLogin = async () => {
    // Mock Google auth: In production use Google OAuth library
    const res = await axios.post(`${API_BASE}/auth/google`, { 
      token: 'google-mock-token' 
    });
    const { token: newToken, user: newUser } = res.data;
    
    localStorage.setItem('adminToken', newToken);
    setToken(newToken);
    setUser(newUser);
    setIsAdmin(newUser.role === 'admin');
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{
      user,
      isAdmin,
      token,
      loading,
      login,
      googleLogin,
      logout
    }}>
      {children}
    </AdminContext.Provider>
  );
};
