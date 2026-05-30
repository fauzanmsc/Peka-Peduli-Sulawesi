import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import Preloader from '@/components/ui/Preloader'

export const metadata: Metadata = {
  title: 'Peka Peduli Sulawesi | Portal Kemanusiaan',
  description: 'Ekosistem digital untuk keterbukaan informasi publik, koordinasi relawan, dan penggalangan dana di wilayah Sulawesi.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="antialiased flex flex-col min-h-screen">
        <Preloader />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
