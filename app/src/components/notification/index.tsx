'use client'

import React, { useState, useEffect } from 'react'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface NotificationProps {
  message: string | React.ReactNode
  type: 'success' | 'error' | 'info'
  onClose?: () => void
  duration?: number
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
  duration = 5000,
}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  const handleClose = () => {
    setIsVisible(false)
    if (onClose) onClose()
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-8 h-8 text-green-500" />
      case 'error':
        return <XCircle className="w-8 h-8 text-red-500" />
      case 'info':
        return <AlertCircle className="w-8 h-8 text-blue-500" />
    }
  }

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900'
      case 'error':
        return 'bg-red-50 dark:bg-red-900'
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900'
    }
  }

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-green-500'
      case 'error':
        return 'border-red-500'
      case 'info':
        return 'border-blue-500'
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className={`${getBgColor()} p-6 rounded-xl shadow-2xl max-w-md w-full mx-4 border-l-4 ${getBorderColor()} transition-all duration-300 ease-in-out transform hover:scale-105`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">{getIcon()}</div>
              <div className="flex-1 pt-0.5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{message}</p>
              </div>
              <div className="flex-shrink-0">
                <button
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200 focus:outline-none"
                  onClick={handleClose}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
              <motion.div
                className={`h-full ${type === 'success'
                  ? 'bg-green-500'
                  : type === 'error'
                    ? 'bg-red-500'
                    : 'bg-blue-500'
                  }`}
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: duration / 1000, ease: 'linear' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}