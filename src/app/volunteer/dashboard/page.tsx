'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Camera, Send, LogOut, CheckCircle2, ShieldAlert } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function VolunteerDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [activeCampaigns, setActiveCampaigns] = useState<any[]>([])
  
  // Form State
  const [selectedCampaign, setSelectedCampaign] = useState('')
  const [reportTitle, setReportTitle] = useState('')
  const [reportText, setReportText] = useState('')
  const [location, setLocation] = useState('Mengambil lokasi GPS...')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        // Fetch active campaigns for dropdown
        const { data: campaigns } = await supabase.from('campaigns').select('id, title').eq('status', 'PUBLISHED')
        if (campaigns) {
          setActiveCampaigns(campaigns)
          if (campaigns.length > 0) setSelectedCampaign(campaigns[0].id)
        }
        
        // Mock Geolocation
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => setLocation(`Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(4)}`),
            () => setLocation('Lokasi GPS tidak diizinkan')
          )
        }
      }
    }
    init()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const { error } = await supabase.from('campaign_updates').insert({
        campaign_id: selectedCampaign,
        reporter_id: user?.id,
        title: reportTitle,
        report_text: reportText + `\n\n[Lokasi Laporan: ${location}]`,
      })
      if (error) throw error
      
      setIsSuccess(true)
      setReportTitle('')
      setReportText('')
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (err) {
      console.error(err)
      alert('Gagal mengirim laporan.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Header */}
      <div className="bg-primary pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="max-w-3xl mx-auto relative z-10 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Portal Relawan</h1>
            <p className="text-primary-100">Selamat bertugas, {user?.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors border border-white/20"
          >
            <LogOut className="w-4 h-4" /> Keluar
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        
        {/* Safety Warning */}
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-xl mb-6 flex items-start gap-3 shadow-sm">
          <ShieldAlert className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-orange-800">
            Pastikan keselamatan diri Anda adalah prioritas utama sebelum melakukan pelaporan situasi dari lapangan.
          </p>
        </div>

        {/* Report Form */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100">
          <div className="mb-8 border-b pb-4">
            <h2 className="text-xl font-bold text-gray-900">Buat Laporan Lapangan</h2>
            <p className="text-sm text-gray-500 mt-1">Laporan Anda akan tampil secara real-time di halaman kampanye publik.</p>
          </div>

          {isSuccess && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5" />
              Laporan berhasil terkirim ke pusat!
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Pilih Kampanye / Penugasan</label>
              <select 
                required
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 bg-gray-50"
              >
                {activeCampaigns.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Laporan Singkat</label>
              <input 
                required
                type="text" 
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                placeholder="Contoh: Logistik Tiba di Posko 3"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Situasi / Kondisi Detail</label>
              <textarea 
                required
                rows={5}
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                placeholder="Jelaskan kondisi terkini, kebutuhan mendesak, atau dokumentasi penyaluran..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 resize-none"
              />
            </div>

            {/* GPS and Media Attachments */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-xs text-gray-600 font-medium truncate">{location}</span>
              </div>
              <button type="button" className="bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
                <Camera className="w-5 h-5" /> Lampirkan Foto
              </button>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting || !selectedCampaign}
              className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_0_rgba(229,62,62,0.4)] disabled:opacity-50 mt-4"
            >
              {isSubmitting ? 'Mengirim Data...' : <><Send className="w-5 h-5" /> Kirim Pembaruan Lapangan</>}
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}
