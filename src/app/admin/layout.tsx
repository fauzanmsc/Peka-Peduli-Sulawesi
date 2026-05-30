'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  Megaphone, 
  Receipt, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Heart
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Kelola Kampanye', icon: Megaphone, href: '/admin/campaigns' },
    { name: 'Data Donasi', icon: Receipt, href: '/admin/donations' },
    { name: 'Pengurus & Relawan', icon: Users, href: '/admin/team' },
    { name: 'Pengaturan', icon: Settings, href: '/admin/settings' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-64 flex flex-col ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary/20 p-1.5 rounded-lg">
              <Heart className="w-5 h-5 text-primary" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-lg tracking-tight text-text-main">
              Admin <span className="text-primary">Panel</span>
            </span>
          </Link>
          <button 
            className="ml-auto lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors font-medium text-sm ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl transition-colors font-medium text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5" />
            Keluar Sistem
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 sm:px-6 lg:px-8 justify-between sticky top-0 z-30">
          <button 
            className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="ml-auto flex items-center gap-4">
            {/* User Profile Dropdown Placeholder */}
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-sm">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
