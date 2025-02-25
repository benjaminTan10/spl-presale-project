'use client';
import React, { useEffect, useState } from 'react';
import AnimatedPage from '../components/animated/AnimatedPage';
import FaqSection from '../components/faq/FaqSection';
import Footer from '../components/basic/BasicFooter';
import Navbar from '../components/basic/BasicNavbar';
import ScrollToTop from '../components/other/ScrollToTopButton';
import Head from 'next/head';
import AboutSection from '../components/about/AboutSection';
import { useRouter } from 'next/router';
import Roadmap from '../components/roadmap';
import CarouselImage from "../components/carousel/carousel";
import ButtonAnimation from "../components/buttonAnimation/Button";
import AdminAdrop from '../components/admin/AdminAirdrop';
import Landing from "../components/landing";


function Home() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedIsAdmin = localStorage.getItem('isAdmin');
    setIsAdmin(storedIsAdmin === 'true');
  }, []);

  const handleStorageChange = () => {
    const storedIsAdmin = localStorage.getItem('isAdmin');
    setIsAdmin(storedIsAdmin === 'true');
  };

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Presale Project</title>
        <meta name="description" content="Presale project for token sales" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnimatedPage>
        <div className='min-w-[374px]'>
          <Navbar activePage='Home' isAdmin={isAdmin} />
          {!isAdmin && (
            <>
              <Landing/>
              <ButtonAnimation />
              <CarouselImage />
              <Roadmap />
              <FaqSection />
            </>
          )}
          {isAdmin && (
            <>
              <AboutSection />
              {/* <AdminAdrop /> */}
            </>
          )}
          <ScrollToTop />
          <Footer />
        </div>
      </AnimatedPage>
    </>
  );
}

export default Home;