import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import styles from '../app/tasks/Tasks.module.css'; // Ensure this path is correct

const NavBar = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  if (typeof isLoggedIn === 'undefined') {
    console.error('useAuth() returned undefined');
    return null;
  }

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
