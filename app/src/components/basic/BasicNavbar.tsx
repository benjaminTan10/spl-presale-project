"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedLogo from '../animated/AnimatedLogo'
import WalletMultiButtonDynamic from '../wallet/WalletMultiButtonDynamic'
import AnimatedOnViewTitleMd from '../animated/AnimatedOnViewTitleMd'
import { X, Menu } from 'lucide-react'
import Settings from './Settings'
import MarketPrice from './MarketPrice'

const CombinedNavbar = ({ activePage = 'Home', isAdmin = false }: { activePage?: string, isAdmin?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showMarketPrice, setShowMarketPrice] = useState(true)
  const [isRTL, setIsRTL] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const router = useRouter()

  // useEffect(() => {
  //   if (!isAdmin) {
  //     router.push('/')
  //   }
  // }, [isAdmin, router])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    // Add logic to actually change the theme
  }
  const toggleDirection = () => {
    setIsRTL(!isRTL)
    // Add logic to change the text direction
  }

  useEffect(() => {
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 10)
      setShowMarketPrice(currentScrollY <= lastScrollY || currentScrollY === 0)
      lastScrollY = currentScrollY
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = () => setIsOpen(!isOpen)
  const signOut = () => {
    localStorage.setItem('isAdmin', JSON.stringify(false))
    router.push('/')
  }

  const closeMarketPrice = () => {
    setShowMarketPrice(false)
  }

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <AnimatePresence>
          {showMarketPrice && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              <MarketPrice onClose={closeMarketPrice} />
            </motion.div>
          )}
        </AnimatePresence>
        <header className={`flex items-center transition-all backdrop-blur-sm duration-300 ${isScrolled ? 'bg-green-700 shadow-md' : 'bg-[#54b354be]'}`}>
          <div className="container px-4 mx-auto">
            <div className="flex items-center justify-between h-24">
              <div className="flex items-center">
                <AnimatedLogo onClick={() => router.push('/')} className="pt-2 ml-2 text-white cursor-pointer sm:ml-0 hover:text-purple-600" />
                <AnimatedOnViewTitleMd
                  onClick={() => router.push('/')}
                  text={isAdmin ? `You are on admin mode!` : `Save The planet!`}
                  delay={0.3}
                  className="hidden text-white cursor-pointer xl:text-5xl lg:text-3xl md:text-1xl sm:text-lg lg:flex hover:text-purple-600"
                  style={{
                    textDecoration: 'underline',
                    textDecorationThickness: '2px',
                    transition: 'text-decoration-color 0.5s ease-in-out',
                  }}
                />
              </div>
              <nav className="items-center hidden space-x-4 md:flex">
                {!isAdmin && (
                  <>
                    <Link href="/" className={`text-white hover:text-purple-600 transition duration-300  ${activePage === 'Home' ? 'border-b-2' : ''}`}>
                      Home
                    </Link>
                    <Link href="https://publuu.com/flip-book/664981/1481321" target="_blank" className={`text-white hover:text-purple-600 transition duration-300  ${activePage === 'Whitepaper' ? 'border-b-2' : ''}`}>
                      Whitepaper
                    </Link>
                    <button
                      onClick={() => scrollToSection('roadmap-section')}
                      className={`text-white hover:text-purple-600 transition duration-300  ${activePage === 'Roadmap' ? 'border-b-2' : ''}`}
                    >
                      Roadmap
                    </button>
                    <button
                      onClick={() => scrollToSection('faq_id')}
                      className={`text-white hover:text-purple-600 transition duration-300  ${activePage === 'FAQ' ? 'border-b-2' : ''}`}
                    >
                      FAQ
                    </button>
                  </>
                )}
                {isAdmin && (
                  <>
                    <button onClick={()=> router.push('/create')} className="text-white transition duration-300 hover:text-purple-600 ">
                      Create
                    </button>
                    <button onClick={()=> router.push('/detail')} className="text-white transition duration-300 hover:text-purple-600">
                      Detail
                    </button>
                    <button onClick={()=> router.push('/explore')} className="text-white transition duration-300 hover:text-purple-600">
                      Explore
                    </button>
                    <button onClick={signOut} className="text-white transition duration-300 hover:text-purple-600">
                      Sign out
                    </button>
                  </>
                )}
                <WalletMultiButtonDynamic />
                <Settings toggleDark={toggleDarkMode} toggleDir={toggleDirection} />
              </nav>

              <div className="flex items-center md:hidden">
                <WalletMultiButtonDynamic />
                <button onClick={handleNav} className="ml-4 text-white hover:text-purple-600">
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed inset-0 z-50 pt-20 bg-[#348f69c7]"
          >
            <button
              onClick={handleNav}
              className="absolute text-white transition duration-300 hover:text-purple-600 top-4 right-4"
            >
              <X size={24} />
            </button>
            <div className="container px-4 mx-auto">
              <nav className="flex flex-col items-center space-y-4">
                {!isAdmin ? (
                  <>
                    <Link href="/" className="text-xl text-white transition duration-300 hover:text-purple-600" onClick={handleNav}>
                      Home
                    </Link>
                    <Link href="https://publuu.com/flip-book/664981/1481321" target="_blank" className="text-xl text-white transition duration-300 hover:text-purple-600" onClick={handleNav}>
                      Whitepaper
                    </Link>
                    <button
                      className="text-xl text-white transition duration-300 hover:text-purple-600"
                      onClick={() => scrollToSection('roadmap-section')}
                    >
                      Roadmap
                    </button>
                    <button
                      className="text-xl text-white transition duration-300 hover:text-purple-600"
                      onClick={() => scrollToSection('faq_id')}
                    >
                      FAQ
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { signOut(); handleNav(); }} className="text-xl text-white transition duration-300 hover:text-purple-600">
                      explore
                    </button>

                    <button onClick={() => { signOut(); handleNav(); }} className="text-xl text-white transition duration-300 hover:text-purple-600">
                      Sign out
                    </button>
                  </>
                )}
                <WalletMultiButtonDynamic />
                <Settings toggleDark={toggleDarkMode} toggleDir={toggleDirection} />
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default CombinedNavbar