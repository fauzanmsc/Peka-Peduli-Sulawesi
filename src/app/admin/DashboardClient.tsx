'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, HeartHandshake, AlertCircle } from 'lucide-react'

interface Stats {
  totalDonations: number
  totalCampaigns: number
  totalVolunteers: number
  urgentCampaigns: number
}

export default function DashboardClient({ stats }: { stats: Stats }) {
  const statCards = [
    { title: 'Total Donasi Tersalurkan', value: `Rp ${(stats.totalDonations / 1000000).toFixed(1)} Juta`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Kampanye Aktif', value: stats.totalCampaigns.toString(), icon: HeartHandshake, color: 'text-primary', bg: 'bg-primary/10' },
    { title: 'Relawan Terdaftar', value: stats.totalVolunteers.toString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Kampanye Mendesak', value: stats.urgentCampaigns.toString(), icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-100' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Ringkasan</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Pantau performa kampanye dan donasi secara real-time.</p>
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
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg}`}>
                <Icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Grafik Donasi (Bulan Ini)</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
             <span className="text-gray-400 font-medium">Recharts Placeholder</span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Donasi Terbaru</h2>
          <div className="space-y-4">
             <div className="text-center py-10 text-gray-400 text-sm">
               Belum ada donasi hari ini.
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
