import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const jwt = document.cookie.split('; ').find(row => row.startsWith('jwt='));
    setIsLoggedIn(!!jwt);
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    document.cookie = 'jwt=; Max-Age=0'; // Clear the JWT cookie
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
