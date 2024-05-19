
'use client';
import React from 'react';
import NavBar from '../components/NavBar';
import AuthGuard from '../components/AuthGuard';
import { AuthProvider } from '../context/AuthContext';
import './globals.css';

const LayoutContent = ({ children }) => (
  <>
    <NavBar />
    <AuthGuard>{children}</AuthGuard>
  </>
);

const Layout = ({ children }) => (
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

export default Layout;


