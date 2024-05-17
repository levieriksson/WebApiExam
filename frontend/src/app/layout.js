'use client';

import React from 'react';
import NavBar from '../components/NavBar';
import './globals.css';

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>My App</title>
      </head>
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
};

export default Layout;
