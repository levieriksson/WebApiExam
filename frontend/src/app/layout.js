'use client';

import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import './globals.css'; // Import global CSS

const Layout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const jwt = document.cookie.split('; ').find(row => row.startsWith('jwt='));
    setIsLoggedIn(!!jwt);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <html lang="en">
      <head>
        <title>My App</title>
      </head>
      <body>
        <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        {children}
      </body>
    </html>
  );
};

export default Layout;
