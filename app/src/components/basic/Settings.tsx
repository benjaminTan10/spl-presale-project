'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { Settings as SettingsIcon } from 'lucide-react'

// Define the type for language options
interface Language {
  code: string;
  name: string;
}

// Define the props for the Settings component
interface SettingsProps {
  toggleDark: () => void;
  toggleDir: () => void;
  invert?: boolean;
}

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'ch', name: 'Chinese' },
]

const Settings: React.FC<SettingsProps> = ({ toggleDark, toggleDir, invert = false }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isDark, setIsDark] = useState<boolean>(false)
  const router = useRouter()
  const settingsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsDark(localStorage.getItem('theme') === 'dark')

    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleChangeMode = () => {
    setIsDark(!isDark)
    toggleDark()
    localStorage.setItem('theme', isDark ? 'light' : 'dark')
  }

  const changeLanguage = (lang: string) => {
    router.push(router.pathname, router.asPath, { locale: lang })
  }

  return (
    <div className="relative" ref={settingsRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-full ${invert ? 'text-gray-800' : 'text-white'
          } hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white`}
      >
        <SettingsIcon className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="absolute right-0 w-48 py-1 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="px-4 py-2">
            <p className="text-sm font-medium text-gray-900">Theme</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-500">Light</span>
              <button
                onClick={handleChangeMode}
                className={`${isDark ? 'bg-indigo-600' : 'bg-gray-200'
                  } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                <span
                  className={`${isDark ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                />
              </button>
              <span className="text-sm text-gray-500">Dark</span>
            </div>
          </div>
          <div className="border-t border-gray-100"></div>
          <div className="px-4 py-2">
            <p className="text-sm font-medium text-gray-900">Language</p>
            <div className="mt-2 space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings
