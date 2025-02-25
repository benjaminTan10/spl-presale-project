
import { useState } from 'react';

const useAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const setAdminLoginState = (state: boolean) => {
    setIsAdmin(state);
    // You might want to save this state to localStorage or a more persistent storage
    localStorage.setItem('isAdmin', JSON.stringify(state));
  };

  return {
    isAdmin,
    setAdminLoginState
  };
};

export default useAuth;
