'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function CampaignSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [urgentCampaigns, setUrgentCampaigns] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch data
  useEffect(() => {
    async function fetchUrgent() {
      const { data } = await supabase
        .from('campaigns')
        .select('*')
        .eq('is_urgent', true)
        .eq('status', 'PUBLISHED')
        .limit(3)
      
      if (data && data.length > 0) {
        setUrgentCampaigns(data)
      } else {
        // Fallback or empty state
        setUrgentCampaigns([])
      }
      setIsLoading(false)
    }
    fetchUrgent()
  }, [])

  // Auto slide
  useEffect(() => {
    if (urgentCampaigns.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % urgentCampaigns.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [urgentCampaigns.length])

  if (isLoading) {
    return <div className="w-full h-[500px] md:h-[600px] rounded-3xl bg-surface animate-pulse flex items-center justify-center text-gray-400">Memuat kampanye darurat...</div>
  }

  if (urgentCampaigns.length === 0) {
    return null
  }

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % urgentCampaigns.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + urgentCampaigns.length) % urgentCampaigns.length)

  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden group shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {/* Background Image with Gradient Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${urgentCampaigns[currentIndex].cover_image_url || 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80'})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-primary px-3 py-1 text-xs font-bold text-white rounded-full flex items-center gap-1 uppercase tracking-wider">
                <AlertCircle className="w-3 h-3" /> DARURAT BENCANA
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {urgentCampaigns[currentIndex].title}
            </h2>
            
            {/* Progress Bar */}
            <div className="mb-6 w-full max-w-xl bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="flex justify-between text-white text-sm mb-2 font-medium">
                <span>Terkumpul: Rp {(urgentCampaigns[currentIndex].current_amount / 1000000).toFixed(0)} Juta</span>
                <span className="text-gray-300">Target: Rp {(urgentCampaigns[currentIndex].target_amount / 1000000).toFixed(0)} Juta</span>
              </div>
              <div className="h-2.5 w-full bg-black/40 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((urgentCampaigns[currentIndex].current_amount / urgentCampaigns[currentIndex].target_amount) * 100, 100)}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-primary"
                />
              </div>
            </div>

            <Link 
              href="/donate" 
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_4px_14px_0_rgba(229,62,62,0.5)] hover:-translate-y-1 w-max"
            >
              Donasi Sekarang
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      {urgentCampaigns.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all border border-white/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all border border-white/20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dots */}
      <div className="absolute bottom-6 right-8 flex gap-2">
        {urgentCampaigns.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentIndex ? 'bg-primary w-8' : 'bg-white/50 hover:bg-white'}`}
          />
        ))}
      </div>
    </div>
  )
}
