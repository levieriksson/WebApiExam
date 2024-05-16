'use client';

import React from 'react';
import Layout from '../app/layout';
import { AuthProvider } from '../context/AuthContext';
import '../app/globals.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
};

export default MyApp;
