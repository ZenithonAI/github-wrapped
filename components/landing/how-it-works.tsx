'use client'

import { motion } from 'framer-motion'
import { Github, Zap, Sparkles, Share2, CheckCircle, Clock } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Connect Your GitHub',
    description: 'Securely connect your GitHub account with one click. We only access your public repositories and contribution data.',
    icon: Github,
    gradient: 'from-blue-500 to-indigo-600',
    duration: '5 seconds',
    features: ['Secure OAuth', 'Read-only access', 'No passwords stored']
  },
  {
    number: '02',
    title: 'AI Analyzes Your Data',
    description: 'Our AI processes your 2025 activity, discovering patterns, calculating streaks, and generating unique insights.',
    icon: Zap,
    gradient: 'from-purple-500 to-pink-600',
    duration: '30-45 seconds',
    features: ['Pattern recognition', 'Personality analysis', 'Achievement detection']
  },
  {
    number: '03',
    title: 'Beautiful Cards Generated',
    description: 'Watch as your coding journey transforms into 12+ stunning, personalized cards with smooth animations.',
    icon: Sparkles,
    gradient: 'from-green-500 to-teal-600',
    duration: '10-15 seconds',
    features: ['12+ unique cards', 'Custom themes', 'Social media ready']
  },
  {
    number: '04',
    title: 'Share Your Story',
    description: 'Export high-quality images and share your developer journey across all your favorite platforms.',
    icon: Share2,
    gradient: 'from-orange-500 to-red-600',
    duration: 'Instant',
    features: ['HD image export', 'Multiple formats', 'Platform optimized']
  }
]

export default function HowItWorks() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
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
            <Clock className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium">Ready in 60 seconds</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            From GitHub connection to shareable masterpiece in four simple steps.
            Our streamlined process makes creating your wrapped effortless.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line - desktop only */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/50 via-secondary-500/50 to-primary-500/50" />

          <div className="space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <motion.div
                  className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full border-4 border-background z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.5, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                />

                {/* Content */}
                <div className="flex-1 max-w-lg">
                  <motion.div
                    className="glass-card p-8 relative group hover:scale-105 transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`} />

                    {/* Step number */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-4xl font-bold text-gradient">{step.number}</span>
                      <div className={`p-3 bg-gradient-to-br ${step.gradient} rounded-xl`}>
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Title and description */}
                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">{step.description}</p>

                    {/* Duration */}
                    <div className="flex items-center space-x-2 mb-4">
                      <Clock className="w-4 h-4 text-primary-400" />
                      <span className="text-sm font-medium text-primary-400">{step.duration}</span>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      {step.features.map((feature, featureIndex) => (
                        <motion.div
                          key={feature}
                          className="flex items-center space-x-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 + featureIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-gray-400">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Visual element */}
                <div className="flex-1 max-w-md">
                  <motion.div
                    className={`relative h-64 bg-gradient-to-br ${step.gradient} rounded-2xl overflow-hidden`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20" />

                    {/* Content based on step */}
                    <div className="relative z-10 h-full flex items-center justify-center p-8">
                      {renderStepVisual(step, index)}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="glass-card p-8 max-w-lg mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-gray-300 mb-6">
              Join thousands of developers who've already wrapped their year
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
              <span>⚡ 60 second setup</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full" />
              <span>🔒 Secure & private</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full" />
              <span>📱 Mobile friendly</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function renderStepVisual(step: typeof steps[0], index: number) {
  switch (index) {
    case 0:
      return (
        <div className="text-center text-white">
          <Github className="w-16 h-16 mx-auto mb-4" />
          <div className="text-lg font-semibold">OAuth Connection</div>
          <div className="text-white/80 text-sm">Secure & Fast</div>
        </div>
      )
    case 1:
      return (
        <div className="text-center text-white">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Zap className="w-16 h-16 mx-auto mb-4" />
          </motion.div>
          <div className="text-lg font-semibold">AI Processing</div>
          <div className="text-white/80 text-sm">Analyzing patterns...</div>
        </div>
      )
    case 2:
      return (
        <div className="text-center text-white">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
          >
            <Sparkles className="w-16 h-16 mx-auto mb-4" />
          </motion.div>
          <div className="text-lg font-semibold">Cards Generated</div>
          <div className="text-white/80 text-sm">12+ beautiful cards</div>
        </div>
      )
    case 3:
      return (
        <div className="text-center text-white">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Share2 className="w-16 h-16 mx-auto mb-4" />
          </motion.div>
          <div className="text-lg font-semibold">Ready to Share</div>
          <div className="text-white/80 text-sm">All platforms supported</div>
        </div>
      )
    default:
      return null
  }
}