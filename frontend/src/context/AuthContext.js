


import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const jwt = document.cookie.split('; ').find(row => row.startsWith('jwt='));
    console.log('JWT:', jwt); // Debugging line
    setIsLoggedIn(!!jwt);
  }, []);
  

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    document.cookie = 'jwt=; Max-Age=0'; 
    setIsLoggedIn(false);
  };

  

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
