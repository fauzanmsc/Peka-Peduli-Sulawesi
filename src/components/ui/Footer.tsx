import Link from 'next/link'
import Image from 'next/image'
import { Heart, Mail, MapPin, Phone, Globe, Share2, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-text-main text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center group">
              <Image 
                src="/logo.svg" 
                alt="Peka Peduli Sulawesi" 
                width={150} 
                height={40} 
                className="h-8 w-auto opacity-90 group-hover:opacity-100 transition-opacity dark:hidden"
              />
              <Image 
                src="/logo-light.svg" 
                alt="Peka Peduli Sulawesi" 
                width={150} 
                height={40} 
                className="h-8 w-auto opacity-90 group-hover:opacity-100 transition-opacity hidden dark:block"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Yayasan kemanusiaan independen yang berdedikasi untuk memberikan bantuan darurat, pemulihan, dan pemberdayaan masyarakat di seluruh pelosok Sulawesi.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Globe className="w-5 h-5 text-gray-300" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Share2 className="w-5 h-5 text-gray-300" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <MessageCircle className="w-5 h-5 text-gray-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-gray-100">Jelajahi</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">Tentang Kami</Link></li>
              <li><Link href="/campaigns" className="text-gray-400 hover:text-white transition-colors text-sm">Program & Kampanye</Link></li>
              <li><Link href="/news" className="text-gray-400 hover:text-white transition-colors text-sm">Berita Relawan</Link></li>
              <li><Link href="/reports" className="text-gray-400 hover:text-white transition-colors text-sm">Laporan Transparansi</Link></li>
            </ul>
          </div>

          {/* Action Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-gray-100">Ambil Peran</h3>
            <ul className="space-y-4">
              <li><Link href="/donate" className="text-gray-400 hover:text-primary transition-colors text-sm font-medium">Donasi Sekarang</Link></li>
              <li><Link href="/volunteer" className="text-gray-400 hover:text-white transition-colors text-sm">Daftar Relawan</Link></li>
              <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors text-sm">Portal Relawan</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Hubungi Kami</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-gray-100">Kantor Pusat</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  Jl. Kemanusiaan No. 45, Kota Palu, Sulawesi Tengah 94111, Indonesia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-gray-400 text-sm">+62 811 2233 4455</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-gray-400 text-sm">halo@pekapeduli.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Ticker / Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Yayasan Peka Peduli Sulawesi. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
