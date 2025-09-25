'use client'

import { motion } from 'framer-motion'
import { Sparkles, BarChart3, Share2, Zap, Shield, Palette, Clock, Users, Trophy } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'Stunning Visuals',
    description: 'Beautiful cards designed for sharing with glassmorphism effects, gradients, and smooth animations',
    gradient: 'from-pink-500 to-purple-600',
    stats: '1200x630px perfect for social'
  },
  {
    icon: BarChart3,
    title: 'Deep Insights',
    description: 'AI-powered analysis reveals your coding personality, patterns, and unique developer traits',
    gradient: 'from-blue-500 to-indigo-600',
    stats: '12+ unique insights'
  },
  {
    icon: Share2,
    title: 'Share & Compare',
    description: 'Export high-quality images and share across all platforms with one click',
    gradient: 'from-green-500 to-emerald-600',
    stats: 'Twitter, LinkedIn, Instagram ready'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate your complete wrapped in under 60 seconds with optimized GitHub API integration',
    gradient: 'from-yellow-500 to-orange-600',
    stats: '<60s generation time'
  },
  {
    icon: Palette,
    title: 'Beautiful Themes',
    description: 'Multiple card designs and themes to match your style, with pro themes for premium users',
    gradient: 'from-purple-500 to-pink-600',
    stats: '5+ themes available'
  },
  {
    icon: Trophy,
    title: 'Achievement System',
    description: 'Unlock badges and achievements based on your coding milestones and accomplishments',
    gradient: 'from-orange-500 to-red-600',
    stats: '20+ achievements to unlock'
  }
]

const additionalFeatures = [
  { icon: Clock, title: 'Night Owl Analysis', description: 'Discover when you code best' },
  { icon: Users, title: 'Team Insights', description: 'Compare with your colleagues' },
  { icon: Shield, title: 'Privacy First', description: 'Your data stays secure' }
]

export default function Features() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-secondary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium">Everything you need</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Why Choose <span className="text-gradient">GitHub Wrapped</span>?
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Transform your GitHub activity into a stunning visual story. More than just statistics -
            it's a beautiful celebration of your developer journey with AI-powered insights.
          </p>
        </motion.div>

        {/* Main features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative glass-card p-8 animate-tilt hover:scale-105 transition-all duration-300"
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`} />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`p-3 bg-gradient-to-br ${feature.gradient} rounded-xl`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-sm text-primary-400 font-medium">{feature.stats}</p>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed">{feature.description}</p>

                {/* Hover effect indicator */}
                <motion.div
                  className="absolute bottom-4 right-4 w-2 h-2 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional features row */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="flex items-center space-x-4 glass p-6 rounded-xl hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-2 bg-primary-500/20 rounded-lg">
                <feature.icon className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {[
            { number: '12+', label: 'Unique Cards' },
            { number: '60s', label: 'Generation Time' },
            { number: '1200x630', label: 'Social Ready' },
            { number: '100%', label: 'Privacy Safe' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="group"
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold text-gradient mb-2"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}