'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Users, HeartHandshake, Map, ReceiptText, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
      {/* Card A: Stats Real-time (3/12) */}
      <motion.div 
        whileHover={{ scale: 0.98 }}
        className="md:col-span-3 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col justify-center relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <ReceiptText className="w-24 h-24 text-primary" />
        </div>
        <h3 className="text-gray-500 font-medium mb-2 text-sm uppercase tracking-wider">Total Donasi Tersalurkan</h3>
        <p className="text-4xl font-bold text-text-main mb-6">Rp 2.4<span className="text-2xl text-gray-400">M</span></p>
        
        <h3 className="text-gray-500 font-medium mb-2 text-sm uppercase tracking-wider">Program Selesai</h3>
        <p className="text-4xl font-bold text-text-main">124<span className="text-2xl text-gray-400">+</span></p>
      </motion.div>

      {/* Card B: News Highlight (6/12) */}
      <motion.div 
        whileHover={{ scale: 0.98 }}
        className="md:col-span-6 bg-surface rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 relative overflow-hidden group flex flex-col justify-end min-h-[300px]"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1593113580326-7db073286bf5?q=80&w=2070&auto=format&fit=crop)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-text-main/90 to-transparent" />
        <div className="relative z-10">
          <span className="bg-primary/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-white rounded-full mb-3 inline-block">BERITA TERKINI</span>
          <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
            Distribusi Logistik Fase 2 Tiba di Pelosok Sigi
          </h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">Tim relawan Peka Peduli berhasil menembus jalur terputus di Sigi untuk mendistribusikan 500 paket sembako dan tenda darurat.</p>
          <Link href="/news" className="inline-flex items-center text-sm font-semibold text-white hover:text-primary transition-colors">
            Baca Selengkapnya <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </motion.div>

      {/* Card C: CTA Daftar Relawan (3/12) */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="md:col-span-3 bg-text-main rounded-3xl p-6 md:p-8 shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden group"
      >
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">Jadilah Pahlawan Sulawesi</h3>
        <p className="text-gray-400 text-sm mb-6">Bergabung dengan 1,200+ relawan aktif di lapangan.</p>
        <Link 
          href="/volunteer" 
          className="bg-primary hover:bg-primary-dark w-full py-3 rounded-xl text-white font-semibold transition-colors flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(229,62,62,0.4)]"
        >
          Daftar Sekarang <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* Card D: Recent Donors (4/12) */}
      <motion.div 
        whileHover={{ scale: 0.98 }}
        className="md:col-span-4 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col h-[350px]"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg text-text-main flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-primary" /> Transparansi Kas
          </h3>
        </div>
        
        {/* Scrolling Area (Simulated vertical scroll via CSS animation would be best, here we just use overflow) */}
        <div className="flex-1 overflow-hidden relative">
          <div className="absolute inset-0 overflow-y-auto pr-2 pb-4 space-y-4 custom-scrollbar">
            {[
              { name: 'Hamba Allah', amount: '500.000', time: '5 menit lalu', msg: 'Semoga berkah untuk semua.' },
              { name: 'Budi Santoso', amount: '1.250.000', time: '12 menit lalu', msg: 'Lekas pulih Sulawesi!' },
              { name: 'Hamba Allah', amount: '300.000', time: '28 menit lalu', msg: '' },
              { name: 'PT Makmur Sejahtera', amount: '10.000.000', time: '1 jam lalu', msg: 'Bantuan kemanusiaan perusahaan.' },
            ].map((donor, idx) => (
              <div key={idx} className="bg-surface p-4 rounded-2xl border border-gray-50">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-text-main text-sm">{donor.name}</span>
                  <span className="text-primary font-bold text-sm">Rp {donor.amount}</span>
                </div>
                <div className="text-xs text-gray-400 mb-2">{donor.time}</div>
                {donor.msg && <p className="text-sm text-text-muted italic">&quot;{donor.msg}&quot;</p>}
              </div>
            ))}
          </div>
          {/* Fade out bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* Card E: Map Infographic (8/12) */}
      <motion.div 
        whileHover={{ scale: 0.99 }}
        className="md:col-span-8 bg-surface rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 relative overflow-hidden flex flex-col md:flex-row items-center min-h-[350px]"
      >
        <div className="md:w-1/2 z-10 space-y-4 mb-6 md:mb-0">
          <h3 className="text-2xl font-bold text-text-main">Jangkauan Misi Kemanusiaan</h3>
          <p className="text-text-muted text-sm leading-relaxed max-w-sm">
            Kami hadir di titik-titik paling krusial di seluruh Sulawesi. Dari Palu, Sigi, Donggala, hingga Masamba, bantuan Anda tersalurkan tepat sasaran.
          </p>
          <div className="flex gap-4 pt-4">
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-50">
              <span className="block text-2xl font-bold text-primary">8</span>
              <span className="text-xs text-gray-500 font-medium">POSKO AKTIF</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-50">
              <span className="block text-2xl font-bold text-text-main">32</span>
              <span className="text-xs text-gray-500 font-medium">TITIK BANTUAN</span>
            </div>
          </div>
        </div>
        
        {/* Placeholder for Map - In a real app, use an interactive SVG Map or Leaflet */}
        <div className="md:w-1/2 absolute right-0 top-0 bottom-0 opacity-20 md:opacity-100 pointer-events-none">
          <div className="w-full h-full flex items-center justify-center p-8">
             <Map className="w-full h-full text-gray-300 drop-shadow-md" strokeWidth={1} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
