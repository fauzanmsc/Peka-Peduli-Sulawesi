'use client'

import { useState, useEffect } from 'react'
import { Download, Search, Filter } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const supabase = createClient()

  useEffect(() => {
    fetchDonations()
  }, [])

  async function fetchDonations() {
    setIsLoading(true)
    const { data } = await supabase
      .from('donations')
      .select('*, campaigns(title)')
      .order('created_at', { ascending: false })
    
    if (data) setDonations(data)
    setIsLoading(false)
  }

  const filteredDonations = donations.filter(d => {
    const matchesSearch = d.donor_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.donor_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.campaigns?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || d.payment_status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const exportCSV = () => {
    const headers = ['ID', 'Nama Donatur', 'Email', 'Kampanye', 'Jumlah', 'Status', 'Tanggal']
    const rows = filteredDonations.map(d => [
      d.id, 
      d.is_anonymous ? 'Hamba Allah' : d.donor_name, 
      d.donor_email, 
      d.campaigns?.title || '-', 
      d.amount, 
      d.payment_status, 
      new Date(d.created_at).toLocaleString('id-ID')
    ])

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `laporan-donasi-${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Transaksi Donasi</h1>
          <p className="text-gray-500 mt-1">Pantau seluruh arus kas masuk dari donatur.</p>
        </div>
        <button 
          onClick={exportCSV}
          className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-sm"
        >
          <Download className="w-5 h-5" /> Export CSV
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Cari nama donatur, email, kampanye..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-gray-400" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
            >
              <option value="ALL">Semua Status</option>
              <option value="SUCCESS">SUCCESS</option>
              <option value="PENDING">PENDING</option>
              <option value="FAILED">FAILED</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Tgl. Transaksi</th>
                <th className="px-6 py-4">Donatur</th>
                <th className="px-6 py-4">Kampanye</th>
                <th className="px-6 py-4">Nominal (Rp)</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center animate-pulse">Memuat data donasi...</td></tr>
              ) : filteredDonations.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-400">Tidak ada data transaksi.</td></tr>
              ) : (
                filteredDonations.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(d.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      <div className="text-xs text-gray-400">{new Date(d.created_at).toLocaleTimeString('id-ID')}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{d.is_anonymous ? 'Hamba Allah' : d.donor_name}</div>
                      <div className="text-xs text-gray-500">{d.donor_email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-[200px] truncate text-gray-700" title={d.campaigns?.title}>
                        {d.campaigns?.title || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">
                      Rp {Number(d.amount).toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        d.payment_status === 'SUCCESS' ? 'bg-green-100 text-green-700' :
                        d.payment_status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {d.payment_status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
