// // src/app/layout.js
// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import NavBar from '../components/NavBar';
// import { AuthProvider, useAuth } from '../context/AuthContext';
// import './globals.css';

// const AuthGuard = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   const router = useRouter();
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   useEffect(() => {
//     if (!isAuthenticated && isClient) {
//       router.push('/login');
//     }
//   }, [isAuthenticated, isClient, router]);

//   if (!isClient) {
//     return null; // Or a loading spinner
//   }

//   return isAuthenticated ? children : null;
// };

// const LayoutContent = ({ children }) => {
//   return (
//     <>
//       <NavBar />
//       <AuthGuard>{children}</AuthGuard>
//     </>
//   );
// };

// const Layout = ({ children }) => {
//   return (
//     <html>
//       <head>
//         <title>My App</title>
//       </head>
//       <body>
//         <AuthProvider>
//           <LayoutContent>{children}</LayoutContent>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// };

// export default Layout;
// src/app/layout.js
// src/app/layout.js
// src/app/layout.js
// src/app/layout.js
'use client';
import React from 'react';
import NavBar from '../components/NavBar';
import AuthGuard from '../components/AuthGuard';
import { AuthProvider } from '../context/AuthContext';
import './globals.css';

const LayoutContent = ({ children }) => (
  <>
    <NavBar />
    <AuthGuard>{children}</AuthGuard>
  </>
);

const Layout = ({ children }) => (
  <html>
    <head>
      <title>My App</title>
    </head>
    <body>
      <AuthProvider>
        <LayoutContent>{children}</LayoutContent>
      </AuthProvider>
    </body>
  </html>
);

export default Layout;


