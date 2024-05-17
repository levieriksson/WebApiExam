import React from 'react';
import NavBar from '../components/NavBar.js';
import { AuthProvider } from '../context/AuthContext';
import '../app/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NavBar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
