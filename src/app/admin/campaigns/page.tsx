'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit3, Trash2, Search, ExternalLink } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchCampaigns()
  }, [])

  async function fetchCampaigns() {
    setIsLoading(true)
    const { data } = await supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setCampaigns(data)
    setIsLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus kampanye ini?')) {
      const { error } = await supabase.from('campaigns').delete().eq('id', id)
      if (!error) {
        setCampaigns(campaigns.filter(c => c.id !== id))
      } else {
        alert('Gagal menghapus kampanye.')
      }
    }
  }

  const filteredCampaigns = campaigns.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Kampanye</h1>
          <p className="text-gray-500 mt-1">Buat, ubah, dan pantau status program donasi Anda.</p>
        </div>
        <Link 
          href="/admin/campaigns/new"
          className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" /> Buat Kampanye
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Cari judul kampanye..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Judul Kampanye</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Terkumpul</th>
                <th className="px-6 py-4">Target</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center animate-pulse">Memuat data...</td></tr>
              ) : filteredCampaigns.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-400">Tidak ada data kampanye.</td></tr>
              ) : (
                filteredCampaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900 line-clamp-1">{c.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{new Date(c.created_at).toLocaleDateString('id-ID')}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        c.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' :
                        c.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      Rp {(c.current_amount / 1000000).toFixed(1)} Jt
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      Rp {(c.target_amount / 1000000).toFixed(1)} Jt
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/campaigns/${c.id}`} target="_blank" className="p-2 text-gray-400 hover:text-primary transition-colors" title="Lihat di Web">
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Edit">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(c.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Hapus">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
