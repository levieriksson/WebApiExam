import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import styles from './NavBar.module.css';

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const getLinkClassName = (path) => {
    return router.pathname === path ? `${styles.navLink} ${styles.active}` : styles.navLink;
  };

  return (
    <nav className={styles.navbar}>
      <h2>Navigation Bar</h2>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/" legacyBehavior>
            <a className={getLinkClassName('/')}>Home</a>
          </Link>
        </li>
        {isAuthenticated && (
          <>
            <li>
              <Link href="/tasks" legacyBehavior>
                <a className={getLinkClassName('/tasks')}>Tasks</a>
              </Link>
            </li>
            <li>
              <Link href="/files" legacyBehavior>
                <a className={getLinkClassName('/files')}>Files</a>
              </Link>
            </li>
            <li>
              <Link href="/calendar" legacyBehavior>
                <a className={getLinkClassName('/calendar')}>Calendar</a>
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
