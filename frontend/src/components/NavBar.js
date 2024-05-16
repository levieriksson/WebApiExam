'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import styles from '../app/tasks/Tasks.module.css'; // Import CSS module

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
