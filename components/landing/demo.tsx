'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Github, Zap, Code2, Calendar, Brain, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

const demoCards = [
  {
    id: 'overview',
    title: 'Year Overview',
    icon: Github,
    gradient: 'from-blue-500 to-purple-600',
    data: {
      commits: '2,847',
      prs: '342',
      issues: '156',
      repos: '23',
      stars: '1,234'
    }
  },
  {
    id: 'night-owl',
    title: 'Night Owl Score',
    icon: Zap,
    gradient: 'from-purple-500 to-pink-600',
    data: {
      percentage: '67%',
      peakHour: '11:47 PM',
      moonPhase: '🌙'
    }
  },
  {
    id: 'languages',
    title: 'Top Languages',
    icon: Code2,
    gradient: 'from-green-500 to-teal-600',
    data: {
      languages: [
        { name: 'TypeScript', percentage: 45, color: '#3178c6' },
        { name: 'JavaScript', percentage: 30, color: '#f1e05a' },
        { name: 'Python', percentage: 25, color: '#3572A5' }
      ]
    }
  },
  {
    id: 'streak',
    title: 'Coding Streak',
    icon: Calendar,
    gradient: 'from-orange-500 to-red-600',
    data: {
      current: '234',
      longest: '456',
      totalDays: '287'
    }
  },
  {
    id: 'personality',
    title: 'Developer Personality',
    icon: Brain,
    gradient: 'from-indigo-500 to-purple-600',
    data: {
      type: 'The Night Coder',
      traits: ['Focused', 'Innovative', 'Persistent'],
      emoji: '🦉'
    }
  }
]

export default function Demo() {
  const [currentCard, setCurrentCard] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % demoCards.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % demoCards.length)
    setIsAutoPlaying(false)
  }

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + demoCards.length) % demoCards.length)
    setIsAutoPlaying(false)
  }

  const goToCard = (index: number) => {
    setCurrentCard(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Play className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium">Interactive Demo</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            See It In <span className="text-gradient">Action</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Experience the beautiful cards that transform your GitHub activity into shareable masterpieces.
            Each card tells a unique story about your coding journey.
          </p>
        </motion.div>

        {/* Main carousel */}
        <div className="relative mb-12">
          <div className="relative h-96 overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCard}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {renderCard(demoCards[currentCard])}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevCard}
            className="absolute left-4 top-1/2 -translate-y-1/2 glass-card p-3 hover:bg-white/20 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextCard}
            className="absolute right-4 top-1/2 -translate-y-1/2 glass-card p-3 hover:bg-white/20 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Card info overlay */}
          <motion.div
            className="absolute bottom-4 left-4 glass-card p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={`info-${currentCard}`}
          >
            <div className="flex items-center space-x-3">
              {React.createElement(demoCards[currentCard].icon, {
                className: "w-6 h-6 text-primary-400"
              })}
              <div>
                <h3 className="font-semibold">{demoCards[currentCard].title}</h3>
                <p className="text-sm text-gray-400">Card {currentCard + 1} of {demoCards.length}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Card indicators */}
        <div className="flex justify-center space-x-3 mb-12">
          {demoCards.map((_, index) => (
            <button
              key={index}
              onClick={() => goToCard(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentCard
                  ? 'bg-primary-500 scale-125'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Thumbnail grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {demoCards.map((card, index) => (
            <motion.button
              key={card.id}
              onClick={() => goToCard(index)}
              className={`relative glass-card p-4 aspect-square hover:scale-105 transition-all duration-300 ${
                index === currentCard ? 'ring-2 ring-primary-500' : ''
              }`}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-10 rounded-xl`} />
              <div className="relative z-10 h-full flex flex-col items-center justify-center space-y-2">
                {React.createElement(card.icon, {
                  className: "w-8 h-8 text-primary-400"
                })}
                <p className="text-sm font-medium text-center">{card.title}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Button variant="gradient" size="lg" className="animate-tilt">
            <Github className="w-5 h-5 mr-2" />
            Create Your Own Wrapped
          </Button>
          <p className="text-sm text-gray-400 mt-3">
            Free to start • Ready in 60 seconds • 12+ card types
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function renderCard(card: typeof demoCards[0]) {
  const IconComponent = card.icon

  switch (card.id) {
    case 'overview':
      return (
        <div className={`relative h-full bg-gradient-to-br ${card.gradient} rounded-2xl p-8 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">@ThePrimeagen</h3>
                  <p className="text-white/80">2025 Year Overview</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">2025</div>
                <div className="text-white/80">Wrapped</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 flex-1">
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">{card.data.commits}</div>
                <div className="text-white/80">Commits</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">{card.data.prs}</div>
                <div className="text-white/80">Pull Requests</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">{card.data.repos}</div>
                <div className="text-white/80">Repositories</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">{card.data.stars}</div>
                <div className="text-white/80">Stars Earned</div>
              </div>
            </div>
          </div>
        </div>
      )

    case 'night-owl':
      return (
        <div className={`relative h-full bg-gradient-to-br ${card.gradient} rounded-2xl p-8 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
            <div className="text-8xl mb-6">{card.data.moonPhase}</div>
            <h3 className="text-3xl font-bold mb-4">Night Owl Developer</h3>
            <div className="text-6xl font-bold mb-2">{card.data.percentage}</div>
            <p className="text-xl text-white/80 mb-4">of commits after 10pm</p>
            <p className="text-white/60">Peak coding time: {card.data.peakHour}</p>
          </div>
        </div>
      )

    case 'languages':
      return (
        <div className={`relative h-full bg-gradient-to-br ${card.gradient} rounded-2xl p-8 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center space-x-3 mb-8">
              <IconComponent className="w-8 h-8" />
              <h3 className="text-2xl font-bold">Top Languages</h3>
            </div>

            <div className="flex-1 space-y-6">
              {card.data.languages?.map((lang, index) => (
                <div key={lang.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{lang.name}</span>
                    <span className="text-white/80">{lang.percentage}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <motion.div
                      className="h-3 rounded-full"
                      style={{ backgroundColor: lang.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${lang.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )

    case 'streak':
      return (
        <div className={`relative h-full bg-gradient-to-br ${card.gradient} rounded-2xl p-8 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 h-full flex flex-col justify-center text-center">
            <IconComponent className="w-16 h-16 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-8">Coding Streak</h3>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-4xl font-bold mb-2">{card.data.current}</div>
                <div className="text-white/80">Current Streak</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">{card.data.longest}</div>
                <div className="text-white/80">Longest Streak</div>
              </div>
            </div>

            <div className="mt-8">
              <div className="text-2xl font-bold">{card.data.totalDays}</div>
              <div className="text-white/80">days coded this year</div>
            </div>
          </div>
        </div>
      )

    case 'personality':
      return (
        <div className={`relative h-full bg-gradient-to-br ${card.gradient} rounded-2xl p-8 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 h-full flex flex-col justify-center text-center">
            <div className="text-8xl mb-6">{card.data.emoji}</div>
            <h3 className="text-3xl font-bold mb-4">{card.data.type}</h3>
            <p className="text-white/80 mb-6">Your AI-generated developer personality</p>

            <div className="flex flex-wrap justify-center gap-3">
              {card.data.traits?.map((trait, index) => (
                <motion.div
                  key={trait}
                  className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {trait}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )

    default:
      return null
  }
}