import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import styles from '../app/tasks/Tasks.module.css'; // Ensure this path is correct

const NavBar = () => {
  const authContext = useAuth();
  console.log('NavBar - authContext:', authContext); // Debugging line

  if (!authContext) {
    console.error('NavBar - useAuth() returned undefined');
    return null;
  }

  const { isLoggedIn, logout } = authContext;
  const router = useRouter();

  const handleLogout = () => {
    console.log('NavBar - handleLogout called');
    logout();
    router.push('/');
  };

  console.log('NavBar - isLoggedIn:', isLoggedIn); // Debugging line

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
