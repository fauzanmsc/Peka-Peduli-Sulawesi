'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang Kami', href: '/about' },
    { name: 'Kampanye', href: '/campaigns' },
    { name: 'Berita', href: '/news' },
    { name: 'Kontak', href: '/contact' },
  ]

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-background border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.svg" 
                alt="Peka Peduli Sulawesi" 
                width={150} 
                height={40} 
                className="h-8 w-auto dark:hidden"
                priority
              />
              <Image 
                src="/logo-light.svg" 
                alt="Peka Peduli Sulawesi" 
                width={150} 
                height={40} 
                className="h-8 w-auto hidden dark:block"
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            <Link
              href="/login"
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium text-sm transition-colors"
            >
              Portal Relawan
            </Link>
            <Link
              href="/donate"
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all shadow-[0_4px_14px_0_rgba(229,62,62,0.39)] hover:shadow-[0_6px_20px_rgba(229,62,62,0.23)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Donasi Sekarang
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-3">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-500 dark:text-gray-400"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            <button
              onClick={() => setIsOpen(true)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none p-1"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white dark:bg-gray-900 shadow-2xl z-50 md:hidden flex flex-col"
            >
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <Image 
                  src="/logo.svg" 
                  alt="Peka Peduli Sulawesi" 
                  width={120} 
                  height={30} 
                  className="h-7 w-auto dark:hidden"
                />
                <Image 
                  src="/logo-light.svg" 
                  alt="Peka Peduli Sulawesi" 
                  width={120} 
                  height={30} 
                  className="h-7 w-auto hidden dark:block"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-3 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
                <Link
                  href="/login"
                  className="block w-full px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Portal Relawan
                </Link>
                <Link
                  href="/donate"
                  className="block w-full px-4 py-3 text-center font-bold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors shadow-md"
                  onClick={() => setIsOpen(false)}
                >
                  Donasi Sekarang
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
