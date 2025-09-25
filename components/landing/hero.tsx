'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronDown, Github, Sparkles } from 'lucide-react'

export default function Hero() {
  const [userCount, setUserCount] = useState(0)

  // Animate user counter on mount
  useEffect(() => {
    const timer = setTimeout(() => setUserCount(1247), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced background with multiple gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-background to-secondary-900/30" />
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-indigo-900/20" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-l from-secondary-500/30 to-primary-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Floating preview cards */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 glass-card p-4 w-48 h-32"
          animate={{
            y: [-20, 20, -20],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <Github className="w-5 h-5 text-primary-400" />
            <span className="text-sm font-medium">Your Stats</span>
          </div>
          <div className="text-2xl font-bold text-gradient">2,847</div>
          <div className="text-xs text-gray-400">commits this year</div>
        </motion.div>

        <motion.div
          className="absolute top-32 right-16 glass-card p-4 w-48 h-32"
          animate={{
            y: [20, -20, 20],
            rotate: [2, -2, 2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-5 h-5 text-secondary-400" />
            <span className="text-sm font-medium">Night Owl</span>
          </div>
          <div className="text-2xl font-bold text-gradient">67%</div>
          <div className="text-xs text-gray-400">after 10pm commits</div>
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-20 glass-card p-4 w-48 h-32"
          animate={{
            y: [-15, 15, -15],
            rotate: [-1, 1, -1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <div className="text-sm font-medium mb-2">Top Language</div>
          <div className="text-2xl font-bold text-gradient">TypeScript</div>
          <div className="text-xs text-gray-400">45% of your code</div>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium">Now available for 2025</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Your{' '}
            <motion.span
              className="text-gradient relative"
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              2025 GitHub Story
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Beautifully Wrapped
            </motion.span>
          </h1>

          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Turn your coding journey into stunning, shareable cards that showcase your developer year.
            Beautiful visualizations, AI-powered insights, and social media ready designs.
          </motion.p>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Button
              variant="gradient"
              size="xl"
              className="animate-tilt group relative"
            >
              <Github className="w-5 h-5 mr-2" />
              Get Your GitHub Wrapped
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-lg"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </Button>

            <motion.div
              className="flex items-center justify-center space-x-4 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <span>Join {userCount.toLocaleString()}+ developers</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full" />
              <span>Free to start</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full" />
              <span>Ready in 60s</span>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center space-y-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <span className="text-xs">See it in action</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}