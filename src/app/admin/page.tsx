'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, HeartHandshake, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalCampaigns: 0,
    totalVolunteers: 0,
    urgentCampaigns: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch donations sum
        const { data: donations } = await supabase.from('donations').select('amount').eq('payment_status', 'SUCCESS')
        const totalAmount = donations?.reduce((sum, item) => sum + Number(item.amount), 0) || 0

        // Fetch campaigns count
        const { count: campaignsCount } = await supabase.from('campaigns').select('*', { count: 'exact', head: true })
        
        // Fetch urgent campaigns count
        const { count: urgentCount } = await supabase.from('campaigns').select('*', { count: 'exact', head: true }).eq('is_urgent', true)

        // Fetch volunteers count
        const { count: volunteersCount } = await supabase.from('volunteer_profiles').select('*', { count: 'exact', head: true })

        setStats({
          totalDonations: totalAmount,
          totalCampaigns: campaignsCount || 0,
          totalVolunteers: volunteersCount || 0,
          urgentCampaigns: urgentCount || 0
        })
      } catch (err) {
        console.error("Error fetching stats:", err)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchStats()
  }, [])

  const statCards = [
    { title: 'Total Donasi Tersalurkan', value: `Rp ${(stats.totalDonations / 1000000).toFixed(1)} Juta`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Kampanye Aktif', value: stats.totalCampaigns.toString(), icon: HeartHandshake, color: 'text-primary', bg: 'bg-primary/10' },
    { title: 'Relawan Terdaftar', value: stats.totalVolunteers.toString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Kampanye Mendesak', value: stats.urgentCampaigns.toString(), icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-100' },
  ]

  if (isLoading) {
    return <div className="animate-pulse space-y-6">
      <div className="h-8 w-64 bg-gray-200 rounded"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1,2,3,4].map(i => <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>)}
      </div>
    </div>
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Ringkasan</h1>
        <p className="text-gray-500 mt-1">Pantau performa kampanye dan donasi secara real-time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={stat.title} 
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg}`}>
                <Icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-lg text-gray-900 mb-4">Grafik Donasi (Bulan Ini)</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
             <span className="text-gray-400 font-medium">Recharts Placeholder</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-lg text-gray-900 mb-4">Donasi Terbaru</h2>
          <div className="space-y-4">
             {/* We can fetch recent 3 donations here. Placeholder for now */}
             <div className="text-center py-10 text-gray-400 text-sm">
               Belum ada donasi hari ini.
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
