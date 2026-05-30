'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Users, HeartHandshake, Map, ReceiptText, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">
      {/* Card A: Stats Real-time (3/12) */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="md:col-span-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] border border-gray-100/50 dark:border-gray-800/50 flex flex-col justify-center relative overflow-hidden group transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
      >
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
          <ReceiptText className="w-32 h-32 text-primary" />
        </div>
        <div className="relative z-10">
          <h3 className="text-gray-500 dark:text-gray-400 font-semibold mb-2 text-xs uppercase tracking-widest">Total Donasi Tersalurkan</h3>
          <p className="text-4xl font-black text-text-main dark:text-white mb-6 drop-shadow-sm">Rp 2.4<span className="text-2xl text-gray-400 font-bold">M</span></p>
          
          <h3 className="text-gray-500 dark:text-gray-400 font-semibold mb-2 text-xs uppercase tracking-widest">Program Selesai</h3>
          <p className="text-4xl font-black text-text-main dark:text-white drop-shadow-sm">124<span className="text-2xl text-primary font-bold">+</span></p>
        </div>
      </motion.div>

      {/* Card B: News Highlight (6/12) */}
      <motion.div 
        whileHover={{ scale: 0.99 }}
        className="md:col-span-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] border border-gray-100/50 dark:border-gray-800/50 relative overflow-hidden group flex flex-col justify-end min-h-[350px] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1593113580326-7db073286bf5?q=80&w=2070&auto=format&fit=crop)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 p-6 md:p-8">
          <span className="bg-primary/90 backdrop-blur-md px-4 py-1.5 text-xs font-black text-white rounded-full mb-4 inline-block shadow-[0_4px_10px_rgba(229,62,62,0.3)]">BERITA TERKINI</span>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight drop-shadow-md">
            Distribusi Logistik Fase 2 Tiba di Pelosok Sigi
          </h3>
          <p className="text-gray-200 text-sm mb-5 line-clamp-2 max-w-lg font-medium drop-shadow-sm">Tim relawan Peka Peduli berhasil menembus jalur terputus di Sigi untuk mendistribusikan 500 paket sembako dan tenda darurat.</p>
          <Link href="/news" className="inline-flex items-center text-sm font-bold text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm px-5 py-2.5 rounded-full transition-all duration-300">
            Baca Selengkapnya <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </motion.div>

      {/* Card C: CTA Daftar Relawan (3/12) */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="md:col-span-3 bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center relative overflow-hidden group transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
      >
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-500" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-500" />
        
        <div className="w-20 h-20 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.05)] relative z-10">
          <Users className="w-10 h-10 text-white drop-shadow-lg" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3 relative z-10 drop-shadow-sm">Jadilah Pahlawan</h3>
        <p className="text-gray-400 text-sm mb-8 relative z-10 font-medium leading-relaxed">Bergabung dengan 1,200+ relawan aktif di lapangan Sulawesi.</p>
        <Link 
          href="/volunteer" 
          className="relative z-10 bg-primary hover:bg-primary-dark w-full py-3.5 rounded-xl text-white font-bold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-[0_8px_25px_rgba(229,62,62,0.4)] hover:-translate-y-1"
        >
          Daftar Sekarang <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>

      {/* Card D: Recent Donors (4/12) */}
      <motion.div 
        whileHover={{ y: -2 }}
        className="md:col-span-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] border border-gray-100/50 dark:border-gray-800/50 flex flex-col h-[380px] transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-bold text-lg text-text-main dark:text-white flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <HeartHandshake className="w-5 h-5 text-primary" />
            </div>
            Transparansi Kas
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
              <div key={idx} className="bg-surface dark:bg-gray-800 p-4 rounded-2xl border border-gray-50 dark:border-gray-700">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-text-main dark:text-gray-200 text-sm">{donor.name}</span>
                  <span className="text-primary font-bold text-sm">Rp {donor.amount}</span>
                </div>
                <div className="text-xs text-gray-400 mb-2">{donor.time}</div>
                {donor.msg && <p className="text-sm text-text-muted dark:text-gray-400 italic">&quot;{donor.msg}&quot;</p>}
              </div>
            ))}
          </div>
          {/* Fade out bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-gray-900 to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* Card E: Map Infographic (8/12) */}
      <motion.div 
        whileHover={{ scale: 0.99 }}
        className="md:col-span-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] border border-gray-100/50 dark:border-gray-800/50 relative overflow-hidden flex flex-col md:flex-row items-center min-h-[380px] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
      >
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-transparent via-primary/5 to-transparent pointer-events-none" />
        <div className="md:w-1/2 z-10 space-y-5 mb-6 md:mb-0 relative">
          <h3 className="text-3xl font-black text-text-main dark:text-white leading-tight">Jangkauan Misi Kemanusiaan</h3>
          <p className="text-text-muted dark:text-gray-400 text-sm leading-relaxed max-w-md font-medium">
            Kami hadir di titik-titik paling krusial di seluruh pelosok Sulawesi. Dari Palu, Sigi, Donggala, hingga Masamba, bantuan Anda tersalurkan tepat sasaran.
          </p>
          <div className="flex gap-4 pt-4">
            <div className="bg-white dark:bg-gray-800 px-5 py-3 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-gray-50 dark:border-gray-700">
              <span className="block text-3xl font-black text-primary drop-shadow-sm">8</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-bold tracking-wider mt-1 block">POSKO AKTIF</span>
            </div>
            <div className="bg-white dark:bg-gray-800 px-5 py-3 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-gray-50 dark:border-gray-700">
              <span className="block text-3xl font-black text-text-main dark:text-white drop-shadow-sm">32</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-bold tracking-wider mt-1 block">TITIK BANTUAN</span>
            </div>
          </div>
        </div>
        
        {/* Placeholder for Map - In a real app, use an interactive SVG Map or Leaflet */}
        <div className="md:w-1/2 absolute right-0 top-0 bottom-0 opacity-20 dark:opacity-10 md:opacity-100 dark:md:opacity-40 pointer-events-none">
          <div className="w-full h-full flex items-center justify-center p-8">
             <Map className="w-full h-full text-gray-200 dark:text-gray-700 drop-shadow-2xl" strokeWidth={0.5} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
