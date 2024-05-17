'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import styles from '../app/tasks/Tasks.module.css';

const auth = useAuth();

if (!auth) {
  console.error('useAuth() returned undefined');
  // Handle this error case, maybe by returning null or showing an error message
  return null;
}

const [isLoggedIn, logout] = auth;

const NavBar = () => {
  const { isLoggedIn, logout } = useAuth();

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className={styles.navbar}>
      {isLoggedIn ? (
        <>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/tasks" className={styles.navLink}>Tasks</Link>
          <button onClick={handleLogout} className={styles.navButton}>Logout</button>
        </>
      ) : (
        <Link href="/login" className={styles.navLink}>Login</Link>
      )}
    </div>
  );
};

export default NavBar;
