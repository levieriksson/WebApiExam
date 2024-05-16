'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import fetcher from '../../utils/fetcher';
import styles from '../tasks/Tasks.module.css'; // Import CSS module

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetcher('/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginData),
      });

      document.cookie = `jwt=${response.token}; path=/`; // Store JWT token in cookies
      login(); // Update the context state
      router.push('/'); // Redirect to home page
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.centeredFormContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h1>Login</h1>
        {error && <p>Error: {error}</p>}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.formInput}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.formInput}
            required
          />
        </div>
        <button type="submit" className={styles.formButton}>Login</button>
      </form>
    </div>
  );
};

export default Login;
