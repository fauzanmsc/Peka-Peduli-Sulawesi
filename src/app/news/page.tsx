'use client'

import { motion } from 'framer-motion'
import { Calendar, User, ChevronRight, Search } from 'lucide-react'
import Link from 'next/link'

const newsData = [
  {
    id: 1,
    title: 'Distribusi Logistik Fase 2 Tiba di Pelosok Sigi',
    excerpt: 'Tim relawan Peka Peduli berhasil menembus jalur terputus di Sigi untuk mendistribusikan 500 paket sembako dan tenda darurat kepada warga terdampak.',
    category: 'Tanggap Darurat',
    date: '30 Mei 2026',
    author: 'Tim Komunikasi',
    image: 'https://images.unsplash.com/photo-1593113580326-7db073286bf5?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Pembangunan Sekolah Sementara di Palu Selesai',
    excerpt: 'Setelah 2 bulan pengerjaan, akhirnya 3 kelas darurat dapat digunakan untuk kegiatan belajar mengajar 120 siswa di desa terpencil.',
    category: 'Pendidikan',
    date: '28 Mei 2026',
    author: 'Koord. Pendidikan',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Trauma Healing Bersama Anak-Anak Penyintas',
    excerpt: 'Lebih dari 50 anak antusias mengikuti sesi trauma healing yang dipandu oleh relawan psikolog Peka Peduli. Kami terus mengawal kesehatan mental mereka.',
    category: 'Kesehatan',
    date: '25 Mei 2026',
    author: 'Tim Medis',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop'
  }
]

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
          <h1 className="text-4xl md:text-5xl font-black text-text-main dark:text-white mb-4 tracking-tight">Berita & Informasi</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Update terkini mengenai kegiatan, penyaluran donasi, dan program kemanusiaan Peka Peduli Sulawesi.</p>
        </div>

        {/* Featured News (Latest) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] border border-gray-100 dark:border-gray-800 grid md:grid-cols-2 group cursor-pointer"
        >
          <div className="h-64 md:h-full relative overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${newsData[0].image})` }} />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{newsData[0].category}</span>
              <span className="text-gray-400 text-sm flex items-center gap-1"><Calendar className="w-4 h-4" /> {newsData[0].date}</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-text-main dark:text-white mb-4 leading-tight group-hover:text-primary transition-colors">{newsData[0].title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 md:line-clamp-none">{newsData[0].excerpt}</p>
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
              <span className="text-gray-500 text-sm flex items-center gap-2"><User className="w-4 h-4" /> {newsData[0].author}</span>
              <span className="text-primary font-bold text-sm flex items-center gap-1">Baca Selengkapnya <ChevronRight className="w-4 h-4" /></span>
            </div>
          </div>
        </motion.div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h3 className="text-2xl font-bold text-text-main dark:text-white">Berita Lainnya</h3>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari berita..." 
              className="w-full md:w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full py-2.5 pl-10 pr-4 text-sm text-text-main dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Grid News */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.slice(1).map((news, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={news.id} 
              className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-gray-100 dark:border-gray-800 group cursor-pointer flex flex-col h-full"
            >
              <div className="h-48 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${news.image})` }} />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">{news.category}</div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-gray-400 text-xs flex items-center gap-1 mb-3"><Calendar className="w-3.5 h-3.5" /> {news.date}</span>
                <h3 className="text-xl font-bold text-text-main dark:text-white mb-3 leading-tight group-hover:text-primary transition-colors">{news.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3">{news.excerpt}</p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
                  <span className="text-gray-500 text-xs font-medium">{news.author}</span>
                  <span className="text-primary text-xs font-bold">Baca &rarr;</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
