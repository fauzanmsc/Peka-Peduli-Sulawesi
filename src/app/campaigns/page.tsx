'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, AlertCircle, TrendingUp, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTag, setFilterTag] = useState('Semua')
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const tags = ['Semua', 'Darurat Bencana', 'Kesehatan', 'Pendidikan', 'Infrastruktur']

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const { data, error } = await supabase
          .from('campaigns')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) {
          console.error('Error fetching campaigns:', error)
        } else if (data) {
          setCampaigns(data)
        }
      } catch (err) {
        console.error('Unexpected error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCampaigns()
  }, [])

  const filteredCampaigns = campaigns.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase())
    // Default tag logic (you can map this to db categories later)
    // For now we just show all if tag is 'Semua'
    const matchesTag = filterTag === 'Semua' // || c.tag === filterTag
    return matchesSearch && matchesTag
  })

  return (
    <div className="min-h-screen bg-background pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-text-main mb-4">Program & Kampanye</h1>
          <p className="text-text-muted text-lg max-w-2xl">
            Jelajahi program kemanusiaan kami. Setiap donasi Anda membawa perubahan nyata bagi mereka yang membutuhkan.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari kampanye..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface border border-gray-200 rounded-full pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main text-sm"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <Filter className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors flex-shrink-0 ${
                  filterTag === tag 
                    ? 'bg-text-main text-white' 
                    : 'bg-surface text-text-muted hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
           <div className="flex justify-center items-center h-64">
             <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
           </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredCampaigns.map(campaign => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={campaign.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group flex flex-col h-full"
                >
                  {/* Card Image Header */}
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${campaign.cover_image_url || 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070'})` }} />
                    {campaign.is_urgent && (
                      <div className="absolute top-4 left-4 bg-primary px-3 py-1 text-xs font-bold text-white rounded-full flex items-center gap-1 shadow-md">
                        <AlertCircle className="w-3 h-3" /> MENDESAK
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-xl text-text-main mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {campaign.title}
                    </h3>
                    
                    {/* Progress Section */}
                    <div className="mb-6 mt-auto">
                      <div className="flex justify-between text-xs font-semibold mb-2">
                        <span className="text-primary">Rp {(campaign.current_amount / 1000000).toFixed(0)} Juta</span>
                        <span className="text-gray-400">Target Rp {(campaign.target_amount / 1000000).toFixed(0)} Juta</span>
                      </div>
                      <div className="h-2 w-full bg-surface rounded-full overflow-hidden mb-2">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-1000"
                          style={{ width: `${Math.min((campaign.current_amount / campaign.target_amount) * 100, 100)}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                        <TrendingUp className="w-3 h-3 text-green-500" />
                        Ayo bantu penuhi target!
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <Link 
                        href={`/campaigns/${campaign.id}`}
                        className="text-sm font-semibold text-text-muted hover:text-text-main transition-colors flex items-center"
                      >
                        Detail <ChevronRight className="w-4 h-4 ml-0.5" />
                      </Link>
                      <Link 
                        href="/donate"
                        className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm hover:shadow-md"
                      >
                        Bantu Sekarang
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!isLoading && filteredCampaigns.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-gray-400">Belum ada data kampanye. Silakan jalankan SQL Insert di Supabase.</h3>
          </div>
        )}

      </div>
    </div>
  )
}
