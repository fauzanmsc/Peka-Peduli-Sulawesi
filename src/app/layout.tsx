import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import Preloader from '@/components/ui/Preloader'

import { ThemeProvider } from '@/components/ui/ThemeProvider'
import ScrollToTop from '@/components/ui/ScrollToTop'

export const metadata: Metadata = {
  title: 'Peka Peduli Sulawesi | Portal Kemanusiaan',
  description: 'Ekosistem digital untuk keterbukaan informasi publik, koordinasi relawan, dan penggalangan dana di wilayah Sulawesi.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Preloader />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
