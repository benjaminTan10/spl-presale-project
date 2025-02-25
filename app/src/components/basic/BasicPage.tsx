'use client';

import React, { useEffect, useState } from 'react'
import AnimatedPage from '../animated/AnimatedPage';
import Navbar from './BasicNavbar';
import ScrollToTopButton from '../other/ScrollToTopButton';

function BasicPage(props) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedIsAdmin = localStorage.getItem('isAdmin');
    setIsAdmin(storedIsAdmin === 'true');
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedIsAdmin = localStorage.getItem('isAdmin');
      setIsAdmin(storedIsAdmin === 'true');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AnimatedPage>
      <div className='bg-gray-200 min-w-[374px] min-h-[100vh]'>
        <Navbar activePage={props.activePage} isAdmin={isAdmin} />
        {props.children}
        <ScrollToTopButton />
      </div>
    </AnimatedPage>
  );
}

export default BasicPage;