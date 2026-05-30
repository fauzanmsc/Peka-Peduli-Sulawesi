'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Heart } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang Kami', href: '/about' },
    { name: 'Kampanye', href: '/campaigns' },
    { name: 'Berita', href: '/news' },
    { name: 'Kontak', href: '/contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
                <Heart className="w-6 h-6 text-primary" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-xl text-text-main tracking-tight">
                Peka Peduli <span className="text-primary">Sulawesi</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-text-muted hover:text-primary font-medium transition-colors text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-text-muted hover:text-primary font-medium text-sm transition-colors"
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
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-muted hover:text-text-main focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-lg absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-3 text-base font-medium text-text-main hover:text-primary hover:bg-surface rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <Link
                href="/login"
                className="block px-3 py-2 text-center text-base font-medium text-text-muted border border-gray-200 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Portal Relawan
              </Link>
              <Link
                href="/donate"
                className="block px-3 py-3 text-center text-base font-semibold text-white bg-primary rounded-lg shadow-md"
                onClick={() => setIsOpen(false)}
              >
                Donasi Sekarang
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
