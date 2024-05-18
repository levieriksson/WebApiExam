// src/components/AuthGuard.js
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import LoginPage from '../app/login/page';

const AuthGuard = ({ children }) => {
  const { isAuthenticated, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push('/login');
    }
  }, [isInitialized, isAuthenticated, router]);

  if (!isInitialized) {
    return null; // Or a loading spinner
  }

  return isAuthenticated ? children : <LoginPage />;
};

export default AuthGuard;
