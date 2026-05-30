import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">Hubungi Kami</h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Kami siap mendengarkan dan berkolaborasi. Jangan ragu untuk menghubungi kami melalui form di bawah atau kunjungi langsung posko utama kami.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Information & Map */}
          <div className="space-y-8">
            <div className="bg-surface p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-text-main mb-6">Informasi Kontak</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-main">Markas Komando Peka Peduli</h4>
                    <p className="text-text-muted text-sm leading-relaxed mt-1">
                      Jl. Kemanusiaan No. 45, Palu Selatan, Kota Palu, Sulawesi Tengah 94111, Indonesia
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-main">Telepon / Siaga 24 Jam</h4>
                    <p className="text-text-muted text-sm leading-relaxed mt-1">
                      +62 811 2233 4455
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-main">Email Resmi</h4>
                    <p className="text-text-muted text-sm leading-relaxed mt-1">
                      halo@pekapeduli.org<br/>
                      kemitraan@pekapeduli.org
                    </p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <a 
                  href="https://wa.me/6281122334455?text=Halo%20Admin%20Peka%20Peduli,%20saya%20ingin%20melaporkan%20kejadian%20darurat/bertanya..." 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg transition-colors shadow-md"
                >
                  <MessageCircle className="w-6 h-6" /> WhatsApp Center
                </a>
              </div>
            </div>

            {/* Map Iframe */}
            <div className="rounded-3xl overflow-hidden h-[300px] shadow-sm border border-gray-100">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d127672.76012678121!2d119.8252277492163!3d-0.8973682914107119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d8bef85002ba561%3A0xc36cecb041f021e1!2sPalu%2C%20Kota%20Palu%2C%20Sulawesi%20Tengah!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10" />
            <h3 className="text-2xl font-bold text-text-main mb-6">Kirim Pesan Langsung</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-text-main">Nama Lengkap</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-surface border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text-main"
                    placeholder="Budi Santoso"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-text-main">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-surface border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text-main"
                    placeholder="budi@email.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-semibold text-text-main">Subjek Pesan</label>
                <select 
                  id="subject" 
                  className="w-full bg-surface border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text-main"
                >
                  <option value="umum">Pertanyaan Umum</option>
                  <option value="donasi">Konfirmasi Donasi</option>
                  <option value="relawan">Pendaftaran Relawan</option>
                  <option value="kerjasama">Kerjasama & CSR</option>
                  <option value="darurat">Laporan Kejadian Darurat</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-text-main">Isi Pesan</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full bg-surface border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text-main resize-none"
                  placeholder="Tuliskan pesan Anda di sini..."
                />
              </div>

              <button 
                type="button" 
                className="w-full bg-text-main hover:bg-gray-800 text-white font-bold text-lg py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl"
              >
                Kirim Pesan
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
