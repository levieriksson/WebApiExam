// src/components/ClientOnly.js
import { useState, useEffect } from 'react';

const ClientOnly = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Or a loading spinner
  }

  return children;
};

export default ClientOnly;
