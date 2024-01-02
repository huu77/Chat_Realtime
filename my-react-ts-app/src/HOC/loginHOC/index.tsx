import React, { useState } from 'react';

// Custom Hook for handling authentication logic
// example about to HOC , it can use more againt
const useAuthentication = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const login = () => {
    setLoggedIn(true);
  };

  return {
    isLoggedIn,
    login,
  };
};