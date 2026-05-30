'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <div className="relative py-24 md:py-32 overflow-hidden mb-6 flex flex-col items-center justify-center text-center perspective-1000">
      
      {/* Background decorations matching the soft, clean design */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-white dark:from-gray-900 dark:via-black dark:to-black z-0" />
      
      {/* Dynamic Glow Effects */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/10 dark:bg-primary/20 rounded-full blur-[120px] z-0 animate-pulse-slow" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px] z-0" />

      {/* Grid Pattern overlay for tech/modern feel */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-[0.05] z-0" />

      <div className="relative z-10 max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="inline-block mb-6 px-6 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-sm"
        >
          <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
            #BersamaUntukSulawesi
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.1] drop-shadow-sm"
        >
          Kami Peka, Kami Peduli{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400">Untuk Kemanusiaan</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-4xl font-bold text-primary mb-8 drop-shadow-sm"
        >
          Dari Kesadaran Menjadi Aksi Nyata
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          Dari sebuah inisiatif kecil yang penuh semangat, kami telah bertransformasi
          menjadi organisasi yang lebih matang, profesional, dan memiliki dampak yang
          signifikan dalam membantu masyarakat.
        </motion.p>
      </div>
    </div>
  )
}
