import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Login</Link>
          <Link href="/tasks">Tasks</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout;
