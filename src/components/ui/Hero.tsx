'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden mb-6 flex flex-col items-center justify-center text-center">
      
      {/* Background decorations matching the soft, clean design */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background z-0" />
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/5 rounded-full blur-[100px] z-0" />
      <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-primary/10 rounded-full blur-[80px] z-0" />

      {/* Background pattern (optional, for the "faint fan" look in the user's screenshot, using a subtle radial gradient) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-200/20 via-transparent to-transparent dark:from-gray-800/20 z-0" />

      <div className="relative z-10 max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 leading-tight"
        >
          Kami Peka, Kami Peduli <br className="hidden md:block" />
          <span className="text-gray-900 dark:text-white">Untuk Kemanusiaan</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl md:text-3xl font-medium text-primary mb-6"
        >
          Dari Kesadaran Menjadi Aksi Nyata
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          Dari sebuah inisiatif kecil yang penuh semangat, kami telah bertransformasi
          menjadi organisasi yang lebih matang, profesional, dan memiliki dampak yang
          signifikan dalam membantu masyarakat.
        </motion.p>
      </div>
    </div>
  )
}
