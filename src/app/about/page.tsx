'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, FileText, ChevronDown, CheckCircle2 } from 'lucide-react'

// Mock Data for Team
const teamMembers = [
  { id: 1, name: 'Dr. Andi Pratama', role: 'Ketua Umum', category: 'Medis', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop' },
  { id: 2, name: 'Siti Aminah, M.Pd', role: 'Koord. Pendidikan', category: 'Pendidikan', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop' },
  { id: 3, name: 'Bripka Rahman', role: 'Kepala Tim SAR', category: 'SAR', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop' },
  { id: 4, name: 'Linda Wati', role: 'Manajer Logistik', category: 'Logistik', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop' },
]

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('Semua')
  const [openAccordion, setOpenAccordion] = useState<number | null>(0)

  const categories = ['Semua', 'Medis', 'Pendidikan', 'SAR', 'Logistik']
  const filteredTeam = activeTab === 'Semua' ? teamMembers : teamMembers.filter(m => m.category === activeTab)

  const legalDocs = [
    { title: 'SK Kemenkumham RI', desc: 'No. AHU-0012345.AH.01.04.Tahun 2021 Tentang Pengesahan Badan Hukum Yayasan Peka Peduli Sulawesi.' },
    { title: 'Tanda Daftar Yayasan Sosial', desc: 'Terdaftar resmi di Dinas Sosial Provinsi Sulawesi Tengah dengan Nomor Induk: 460/112/DINSOS.' },
    { title: 'NPWP Yayasan', desc: 'NPWP: 99.888.777.6-555.000 atas nama Yayasan Peka Peduli.' },
  ]

  return (
    <div className="min-h-screen bg-background pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">Tentang Kami</h1>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        {/* Visi & Misi */}
        <section className="mb-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black flex items-center gap-4 text-text-main dark:text-white drop-shadow-sm">
              <div className="p-3 bg-primary/10 rounded-2xl shadow-inner border border-primary/20">
                <Target className="w-8 h-8 text-primary" />
              </div> 
              Visi & Misi
            </h2>
            <div className="p-8 md:p-10 border-l-4 border-primary bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-r-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] border-y border-r border-gray-100/50 dark:border-gray-800/50 transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
              <h3 className="text-2xl font-bold text-text-main dark:text-white mb-4">Visi</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 font-medium text-lg">
                Menjadi lembaga kemanusiaan terdepan di Sulawesi yang responsif, transparan, dan berdampak nyata dalam membangun ketangguhan masyarakat menghadapi bencana dan krisis.
              </p>
              <h3 className="text-2xl font-bold text-text-main dark:text-white mb-5">Misi</h3>
              <ul className="space-y-4">
                {[
                  'Menyalurkan bantuan tanggap darurat secara cepat dan tepat sasaran.',
                  'Memfasilitasi layanan kesehatan dan trauma healing bagi penyintas.',
                  'Membangun kembali infrastruktur pendidikan dan fasilitas umum.',
                  'Mengedukasi masyarakat tentang mitigasi dan kesiapsiagaan bencana.'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-surface/50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700/50">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="hidden md:block relative h-full min-h-[400px]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593113580326-7db073286bf5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center rounded-3xl grayscale hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-primary/10 rounded-3xl mix-blend-multiply" />
          </div>
        </section>

        {/* Legalitas Accordion */}
        <section className="mb-24 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold flex items-center justify-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-primary" /> Legalitas & Kredibilitas
            </h2>
            <p className="text-text-muted">Kepercayaan publik adalah amanah terbesar kami.</p>
          </div>
          
          <div className="space-y-4">
            {legalDocs.map((doc, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-md transition-shadow">
                <button 
                  onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-semibold text-lg text-text-main dark:text-white">{doc.title}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openAccordion === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openAccordion === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 border-t border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 bg-surface/50 dark:bg-gray-800/30">
                        {doc.desc}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Susunan Pengurus */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Tim Pengurus Inti</h2>
            <p className="text-text-muted mb-8">Pahlawan di balik layar misi kemanusiaan Peka Peduli.</p>
            
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === cat 
                      ? 'bg-text-main text-white shadow-md' 
                      : 'bg-surface text-text-muted hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {filteredTeam.map(member => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={member.id}
                  className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-gray-100 dark:border-gray-800 group"
                >
                  <div className="h-64 relative overflow-hidden">
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${member.image})` }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                    </div>
                    <div className="p-6 relative -mt-10 bg-white dark:bg-gray-900 mx-4 mb-4 rounded-2xl shadow-lg dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex flex-col items-center text-center border border-gray-50 dark:border-gray-800">
                      <h3 className="font-bold text-lg text-text-main dark:text-white">{member.name}</h3>
                      <p className="text-primary text-sm font-semibold mb-1">{member.role}</p>
                      <span className="text-xs px-2 py-1 bg-surface dark:bg-gray-800 rounded-md text-gray-500 dark:text-gray-400">{member.category}</span>
                    </div>
                  </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

      </div>
    </div>
  )
}
