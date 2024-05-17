import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const jwt = document.cookie.split('; ').find(row => row.startsWith('jwt='));
    console.log('AuthProvider - JWT:', jwt); // Debugging line
    setIsLoggedIn(!!jwt);
    console.log('AuthProvider - isLoggedIn after setting:', !!jwt); // Debugging line
  }, []);

  const login = () => {
    console.log('AuthProvider - login function called');
    setIsLoggedIn(true);
  };

  const logout = () => {
    console.log('AuthProvider - logout function called');
    document.cookie = 'jwt=; Max-Age=0';
    setIsLoggedIn(false);
  };

  console.log('AuthProvider - isLoggedIn:', isLoggedIn); // Debugging line

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log('useAuth - context:', context); // Debugging line
  return context;
};
