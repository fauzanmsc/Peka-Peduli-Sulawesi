'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail, ArrowRight, UserPlus, User } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      })

      if (error) throw error

      // Registration successful. In production, they might need to confirm email.
      // We will just push to dashboard for demo.
      router.push('/volunteer/dashboard')
      
    } catch (error: any) {
      if (error.message?.includes('Failed to fetch')) {
        // Bypass login if Supabase is entirely unreachable (Demo Mode)
        console.warn('Supabase Offline: Bypassing to Volunteer Dashboard Demo Mode')
        router.push('/volunteer/dashboard')
      } else {
        setErrorMsg(error.message || 'Gagal mendaftar. Silakan coba lagi.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />

      <Link href="/" className="absolute top-8 left-8 text-gray-400 hover:text-white transition-colors text-sm font-semibold flex items-center gap-2">
        &larr; Kembali ke Beranda
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-3xl p-8 md:p-10 shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(229,62,62,0.3)] mb-6">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Daftar Relawan</h1>
          <p className="text-gray-400 text-sm">Bergabung bersama kami menebar kebaikan.</p>
        </div>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 mb-6">
            <p className="text-red-400 text-sm font-medium">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Nama Lengkap</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                placeholder="Fauzan Relawan"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Alamat Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                placeholder="relawan@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Kata Sandi</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 pl-12 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                placeholder="Minimal 6 karakter"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-4 shadow-[0_0_20px_rgba(229,62,62,0.2)]"
          >
            {isLoading ? 'Memproses...' : (
              <>Buat Akun <ArrowRight className="w-5 h-5" /></>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-800 pt-6">
          <p className="text-sm text-gray-500">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-primary hover:text-primary-dark font-medium transition-colors">
              Masuk di sini
            </Link>
          </p>
        </div>
      </motion.div>
      
      <div className="mt-8 text-gray-600 text-xs text-center z-10">
        Peka Peduli Sulawesi &copy; {new Date().getFullYear()}. Secure Access Portal.
      </div>
    </div>
  )
}
