// // src/context/AuthContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import Cookies from 'js-cookie';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = Cookies.get('token');
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const logout = () => {
//     Cookies.remove('token');
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// src/context/AuthContext.js
// src/context/AuthContext.js
// src/context/AuthContext.js
//new new newn newn enwe n wnenwewn
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import Cookies from 'js-cookie';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isInitialized, setIsInitialized] = useState(false);

//   useEffect(() => {
//     const token = Cookies.get('token');
//     if (token) {
//       setIsAuthenticated(true);
//     }
//     setIsInitialized(true);
//   }, []);

//   const logout = () => {
//     Cookies.remove('token');
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout, isInitialized }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// src/context/AuthContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import Cookies from 'js-cookie';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isInitialized, setIsInitialized] = useState(false);

//   useEffect(() => {
//     const token = Cookies.get('token');
//     if (token) {
//       setIsAuthenticated(true);
//     }
//     setIsInitialized(true);
//   }, []);

//   const logout = () => {
//     Cookies.remove('token');
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout, isInitialized }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// src/context/AuthContext.js
// src/context/AuthContext.js
// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsInitialized(true);
  }, []);

  const logout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout, isInitialized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


