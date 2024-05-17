import React from 'react';
import NavBar from '../components/NavBar';
import { AuthProvider } from '../context/AuthContext';
import Login from '../app/login/page';
import fetcher from '../utils/fetcher';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NavBar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
