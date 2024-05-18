// src/app/layout.js
'use client';
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import LoginPage from '../app/login/page';
import { AuthProvider, useAuth } from '../context/AuthContext';
import './globals.css';

const LayoutContent = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Or a loading spinner
  }

  return isAuthenticated ? (
    <>
      <NavBar />
      {children}
    </>
  ) : (
    <LoginPage />
  );
};

const Layout = ({ children }) => {
  return (
    <html>
      <head>
        <title>My App</title>
      </head>
      <body>
        <AuthProvider>
          <LayoutContent>{children}</LayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;
