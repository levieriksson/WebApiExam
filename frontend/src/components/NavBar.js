// src/components/NavBar.js
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import styles from './NavBar.module.css';

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <h2>Navigation Bar</h2>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
        </li>
        {isAuthenticated && (
          <>
            <li>
              <Link href="/tasks" className={styles.navLink}>
                Tasks
              </Link>
            </li>
            <li>
              <Link href="/files" className={styles.navLink}>
                Files
              </Link>
            </li>
            <li>
              <Link href="/calendar" className={styles.navLink}>
                Calendar
              </Link>
            </li>
          </>
        )}
      </ul>
      {isAuthenticated && (
        <div className={styles.navbarRight}>
          <button onClick={logout} className={`${styles.navLink} ${styles.navButton}`}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
