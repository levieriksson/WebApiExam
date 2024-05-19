// src/app/login/page.js
'use client';

import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useAuth } from '../../context/AuthContext';
import fetcher from '../../utils/fetcher';
import styles from './login.module.css';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetcher('/api/Auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      Cookies.set('token', response.token);
      setIsAuthenticated(true);
      router.push('/home');
    } catch (error) {
      console.error('Login error:', error.message);
      setError('Invalid email or password');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <div className={styles.overlay}></div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.formTitle}>Login</h1>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
