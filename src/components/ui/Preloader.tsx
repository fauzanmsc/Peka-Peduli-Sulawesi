'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 15
      })
    }, 50)

    // Force finish after a short duration for fast networks
    const timeout = setTimeout(() => {
      setProgress(100)
      setTimeout(() => {
        setIsLoading(false)
      }, 300) // slight delay after reaching 100
    }, 800)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
        >
          {/* Top Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Glowing Pulse Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.1, 1], opacity: 1 }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl preloader-glow animate-pulse" />
            <div className="bg-white p-4 rounded-full shadow-lg relative z-10">
              <Heart className="w-12 h-12 text-primary" strokeWidth={2.5} />
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-text-muted font-medium tracking-wide uppercase text-sm"
          >
            Menyiapkan Kebaikan...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
