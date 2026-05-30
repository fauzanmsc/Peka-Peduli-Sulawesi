'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle2, Heart, CreditCard, User, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'

export default function DonatePage() {
  const [step, setStep] = useState(1)
  
  // Form State
  const [amount, setAmount] = useState<number | ''>('')
  const [campaign, setCampaign] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [donorPhone, setDonorPhone] = useState('')
  const [prayerNotes, setPrayerNotes] = useState('')
  
  // DB State
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [isLoadingCampaigns, setIsLoadingCampaigns] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const supabase = createClient()
  const predefinedAmounts = [50000, 100000, 250000, 500000, 1000000]

  useEffect(() => {
    async function fetchCampaigns() {
      const { data, error } = await supabase
        .from('campaigns')
        .select('id, title')
        .eq('status', 'PUBLISHED')
      
      if (data) {
        setCampaigns(data)
        if (data.length > 0) setCampaign(data[0].id)
      }
      setIsLoadingCampaigns(false)
    }
    fetchCampaigns()
  }, [])

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const handlePayment = async () => {
    if (!amount || !campaign || !donorEmail) return
    setIsSubmitting(true)
    
    // Simulate Midtrans Snap token fetch (Normally call /api/donations/create here)
    const paymentGatewayRef = `MOCK-TX-${Date.now()}`
    
    try {
      const { error } = await supabase
        .from('donations')
        .insert({
          campaign_id: campaign,
          donor_name: isAnonymous ? 'Hamba Allah' : (donorName || 'Hamba Allah'),
          donor_email: donorEmail,
          donor_phone: donorPhone,
          amount: amount,
          is_anonymous: isAnonymous,
          prayer_notes: prayerNotes,
          payment_gateway_ref: paymentGatewayRef,
          payment_type: 'MOCK_QRIS',
          payment_status: 'SUCCESS', // For testing without real Midtrans
        })

      if (error) throw error
      
      // Also increment campaign current_amount
      const selectedCampaign = campaigns.find(c => c.id === campaign)
      if (selectedCampaign) {
        // Safe approach is using a stored procedure, but for mockup we fetch and update
        const { data: cData } = await supabase.from('campaigns').select('current_amount').eq('id', campaign).single()
        if (cData) {
          await supabase.from('campaigns').update({ current_amount: Number(cData.current_amount) + Number(amount) }).eq('id', campaign)
        }
      }

      setIsSuccess(true)
    } catch (err) {
      console.error('Donation failed:', err)
      alert('Terjadi kesalahan saat memproses donasi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-text-main mb-2">Terima Kasih!</h2>
          <p className="text-text-muted mb-8 leading-relaxed">
            Donasi Anda sebesar Rp {(amount || 0).toLocaleString('id-ID')} telah berhasil kami terima. Semoga membawa berkah.
          </p>
          <Link href="/campaigns" className="bg-primary text-white px-6 py-3 rounded-xl font-bold w-full inline-block">
            Lihat Kampanye Lain
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface pt-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-text-main mb-4">Salurkan Kebaikan</h1>
          <p className="text-text-muted">Bantuan Anda adalah harapan bagi mereka yang membutuhkan di Sulawesi.</p>
        </div>

        {/* Stepper */}
        <div className="mb-10 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full z-0" />
          <motion.div 
            className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full z-0" 
            initial={{ width: '0%' }}
            animate={{ width: `${((step - 1) / 2) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
          <div className="flex justify-between relative z-10">
            {[1, 2, 3].map((num) => (
              <div 
                key={num} 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                  step >= num ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-400 border-2 border-gray-200'
                }`}
              >
                {step > num ? <CheckCircle2 className="w-5 h-5" /> : num}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-xs font-semibold text-gray-500 px-1">
            <span className={step >= 1 ? 'text-primary' : ''}>Nominal</span>
            <span className={step >= 2 ? 'text-primary' : ''}>Identitas</span>
            <span className={step >= 3 ? 'text-primary' : ''}>Pembayaran</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100 relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: NOMINAL */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-primary/10 p-3 rounded-2xl">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-text-main">Pilih Nominal & Tujuan</h2>
                </div>

                <div className="space-y-6">
                  {/* Campaign Select */}
                  <div>
                    <label className="block text-sm font-semibold text-text-main mb-2">Tujuan Donasi</label>
                    <select 
                      value={campaign}
                      onChange={(e) => setCampaign(e.target.value)}
                      disabled={isLoadingCampaigns}
                      className="w-full bg-surface border border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main font-medium appearance-none"
                    >
                      {isLoadingCampaigns ? (
                        <option>Memuat data...</option>
                      ) : campaigns.length === 0 ? (
                        <option>Belum ada kampanye aktif</option>
                      ) : (
                        campaigns.map(c => (
                          <option key={c.id} value={c.id}>{c.title}</option>
                        ))
                      )}
                    </select>
                  </div>

                  {/* Nominal Buttons */}
                  <div>
                    <label className="block text-sm font-semibold text-text-main mb-3">Pilih Nominal Cepat</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {predefinedAmounts.map(amt => (
                        <button
                          key={amt}
                          onClick={() => setAmount(amt)}
                          className={`py-3 rounded-xl font-semibold border transition-all ${
                            amount === amt 
                              ? 'bg-primary/10 border-primary text-primary shadow-sm' 
                              : 'bg-white border-gray-200 text-text-main hover:border-primary/50'
                          }`}
                        >
                          Rp {(amt / 1000).toLocaleString('id-ID')}k
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Nominal */}
                  <div>
                    <label className="block text-sm font-semibold text-text-main mb-2">Atau Masukkan Nominal Lain</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">Rp</span>
                      <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value) || '')}
                        placeholder="0"
                        className="w-full bg-surface border border-gray-200 rounded-xl pl-12 pr-4 py-4 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex justify-end">
                  <button 
                    onClick={nextStep}
                    disabled={!amount || amount < 10000 || !campaign}
                    className="bg-primary hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-md"
                  >
                    Lanjut Isi Identitas <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: IDENTITAS */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-primary/10 p-3 rounded-2xl">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-text-main">Informasi Donatur</h2>
                </div>

                <div className="space-y-5">
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3 mb-6">
                    <ShieldCheck className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-800 leading-relaxed">
                      Informasi Anda kami simpan dengan aman dan tidak akan dibagikan ke pihak ketiga.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-main mb-2">Nama Lengkap</label>
                    <input 
                      type="text" 
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Budi Santoso"
                      className="w-full bg-surface border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2 mb-4">
                    <input 
                      type="checkbox" 
                      id="anonymous" 
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-4 h-4 text-primary focus:ring-primary rounded border-gray-300"
                    />
                    <label htmlFor="anonymous" className="text-sm text-gray-600 font-medium cursor-pointer">
                      Sembunyikan nama saya (Hamba Allah)
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-text-main mb-2">Email Aktif *</label>
                      <input 
                        type="email" 
                        required
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        placeholder="budi@email.com"
                        className="w-full bg-surface border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-text-main mb-2">No. WhatsApp</label>
                      <input 
                        type="tel" 
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                        placeholder="08123456789"
                        className="w-full bg-surface border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-main mb-2">Pesan & Doa (Opsional)</label>
                    <textarea 
                      rows={3}
                      value={prayerNotes}
                      onChange={(e) => setPrayerNotes(e.target.value)}
                      placeholder="Tuliskan doa atau dukungan moral Anda..."
                      className="w-full bg-surface border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main resize-none"
                    />
                  </div>
                </div>

                <div className="mt-10 flex justify-between items-center">
                  <button 
                    onClick={prevStep}
                    className="text-text-muted hover:text-text-main font-semibold flex items-center gap-2 px-4 py-2"
                  >
                    <ArrowLeft className="w-5 h-5" /> Kembali
                  </button>
                  <button 
                    onClick={nextStep}
                    disabled={!donorEmail}
                    className="bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-md"
                  >
                    Lanjut Pembayaran <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: PEMBAYARAN */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-primary/10 p-3 rounded-2xl">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-text-main">Ringkasan & Pembayaran</h2>
                </div>

                <div className="bg-surface rounded-2xl p-6 border border-gray-100 mb-8 space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-text-muted text-sm">Nominal Donasi</span>
                    <span className="font-bold text-lg text-text-main">Rp {(amount || 0).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-text-muted text-sm">Program Pilihan</span>
                    <span className="font-semibold text-sm text-text-main text-right max-w-[200px] truncate">
                      {campaigns.find(c => c.id === campaign)?.title || 'Data Kampanye...'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted text-sm">Nama Penampil</span>
                    <span className="font-semibold text-sm text-text-main">
                      {isAnonymous ? 'Hamba Allah' : (donorName || 'Hamba Allah')}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-2xl p-6 text-center text-white mb-8">
                  <p className="text-sm text-gray-400 mb-2">Total yang harus dibayar</p>
                  <p className="text-4xl font-bold text-primary mb-4">Rp {(amount || 0).toLocaleString('id-ID')}</p>
                  <p className="text-xs text-gray-400">Pembayaran aman didukung oleh Midtrans/Xendit gateway.</p>
                </div>

                <div className="mt-10 flex justify-between items-center">
                  <button 
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="text-text-muted hover:text-text-main font-semibold flex items-center gap-2 px-4 py-2 disabled:opacity-50"
                  >
                    <ArrowLeft className="w-5 h-5" /> Kembali
                  </button>
                  <button 
                    onClick={handlePayment}
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_4px_14px_0_rgba(229,62,62,0.5)] hover:-translate-y-1 disabled:opacity-70 disabled:hover:-translate-y-0"
                  >
                    {isSubmitting ? 'Memproses...' : 'Bayar Sekarang (Mock)'} <ShieldCheck className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  )
}
