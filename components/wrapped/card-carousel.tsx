'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GitHubStatsData } from '@/hooks/use-github-stats'

// Import card components (we'll create these next)
import OverviewCard from '@/components/cards/overview-card'
import LanguagesCard from '@/components/cards/languages-card'
import ContributionsCard from '@/components/cards/contributions-card'
import StreakCard from '@/components/cards/streak-card'
import PersonalityCard from '@/components/cards/personality-card'

interface CardCarouselProps {
  stats: GitHubStatsData
  username: string
  year: number
  currentCard: number
  onCardChange: (index: number) => void
}

// Define the card types and their components
const cardComponents = [
  { component: OverviewCard, name: 'Overview', description: 'Your year in numbers' },
  { component: ContributionsCard, name: 'Contributions', description: 'Your coding activity' },
  { component: LanguagesCard, name: 'Languages', description: 'Your tech stack' },
  { component: StreakCard, name: 'Streak', description: 'Consistency matters' },
  { component: PersonalityCard, name: 'Personality', description: 'Your coding style' },
]

export default function CardCarousel({ stats, username, year, currentCard, onCardChange }: CardCarouselProps) {
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [direction, setDirection] = useState(1)

  // Auto-advance cards
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setDirection(1)
      onCardChange((currentCard + 1) % cardComponents.length)
    }, 8000) // 8 seconds per card

    return () => clearInterval(interval)
  }, [currentCard, isAutoPlaying, onCardChange])

  const nextCard = () => {
    setDirection(1)
    setIsAutoPlaying(false)
    onCardChange((currentCard + 1) % cardComponents.length)
  }

  const prevCard = () => {
    setDirection(-1)
    setIsAutoPlaying(false)
    onCardChange(currentCard === 0 ? cardComponents.length - 1 : currentCard - 1)
  }

  const goToCard = (index: number) => {
    setDirection(index > currentCard ? 1 : -1)
    setIsAutoPlaying(false)
    onCardChange(index)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevCard()
      if (e.key === 'ArrowRight') nextCard()
      if (e.key === ' ') {
        e.preventDefault()
        toggleAutoPlay()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentCard])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  }

  const CurrentCardComponent = cardComponents[currentCard].component

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 relative">
      {/* Card display area */}
      <div className="relative h-[600px] flex items-center justify-center mb-8">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentCard}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <CurrentCardComponent
              stats={stats}
              username={username}
              year={year}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <Button
          variant="ghost"
          size="lg"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass hover:bg-white/20 z-10"
          onClick={prevCard}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <Button
          variant="ghost"
          size="lg"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass hover:bg-white/20 z-10"
          onClick={nextCard}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Card indicators and controls */}
      <div className="flex flex-col items-center space-y-6">
        {/* Card info */}
        <motion.div
          key={currentCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-2">
            {cardComponents[currentCard].name}
          </h3>
          <p className="text-gray-400">
            {cardComponents[currentCard].description}
          </p>
        </motion.div>

        {/* Dot indicators */}
        <div className="flex items-center space-x-3">
          {cardComponents.map((_, index) => (
            <button
              key={index}
              onClick={() => goToCard(index)}
              className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentCard
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 scale-125'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            >
              {index === currentCard && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary-400"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleAutoPlay}
            className="text-gray-400 hover:text-white"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Play
              </>
            )}
          </Button>

          <div className="text-sm text-gray-500">
            Use ← → keys to navigate, space to pause
          </div>
        </div>

        {/* Progress indicator for auto-play */}
        {isAutoPlaying && (
          <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 8, ease: 'linear' }}
              key={currentCard}
            />
          </div>
        )}
      </div>
    </div>
  )
}