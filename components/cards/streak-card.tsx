'use client'

import { motion } from 'framer-motion'
import { Zap, Award, Calendar, TrendingUp } from 'lucide-react'
import { GitHubStatsData } from '@/hooks/use-github-stats'

interface StreakCardProps {
  stats: GitHubStatsData
  username: string
  year: number
}

export default function StreakCard({ stats, username, year }: StreakCardProps) {
  const { streak_data } = stats
  const currentStreak = streak_data.current_streak || 0
  const longestStreak = streak_data.longest_streak || 0
  const totalDays = streak_data.total_days || 0

  // Calculate streak level based on longest streak
  const getStreakLevel = (streak: number) => {
    if (streak >= 100) return { level: 'Legendary', color: 'text-yellow-400', bgColor: 'bg-yellow-400/20' }
    if (streak >= 50) return { level: 'Epic', color: 'text-purple-400', bgColor: 'bg-purple-400/20' }
    if (streak >= 30) return { level: 'Master', color: 'text-blue-400', bgColor: 'bg-blue-400/20' }
    if (streak >= 14) return { level: 'Pro', color: 'text-green-400', bgColor: 'bg-green-400/20' }
    if (streak >= 7) return { level: 'Active', color: 'text-orange-400', bgColor: 'bg-orange-400/20' }
    return { level: 'Getting Started', color: 'text-gray-400', bgColor: 'bg-gray-400/20' }
  }

  const streakLevel = getStreakLevel(longestStreak)
  const streakPercentage = Math.min((longestStreak / 365) * 100, 100)

  // Create flame animation based on streak intensity
  const flameSize = Math.min(currentStreak / 10, 5)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <motion.div
      className="w-full max-w-2xl aspect-[4/3] relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Card background */}
      <div className="absolute inset-0 glass-card p-8 overflow-hidden">
        {/* Background flames */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-4 h-6 ${streakLevel.color.replace('text-', 'bg-').replace('-400', '-300')} rounded-full opacity-10`}
              style={{
                left: `${20 + i * 15}%`,
                bottom: `${10 + Math.random() * 20}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.3, 0.1],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Header */}
        <motion.div variants={itemVariants} className="relative z-10 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-12 h-12 rounded-full ${streakLevel.bgColor} flex items-center justify-center`}>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <Zap className={`w-6 h-6 ${streakLevel.color}`} />
              </motion.div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Streak Power</h2>
              <p className="text-gray-400">Your consistency in {year}</p>
            </div>
          </div>

          {/* Streak level badge */}
          <motion.div
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${streakLevel.bgColor}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.5 }}
          >
            <Award className={`w-4 h-4 ${streakLevel.color}`} />
            <span className={`font-bold ${streakLevel.color}`}>{streakLevel.level}</span>
          </motion.div>
        </motion.div>

        {/* Main stats */}
        <motion.div variants={containerVariants} className="relative z-10 space-y-6">
          {/* Longest streak showcase */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="mb-4">
              <motion.div
                className={`text-6xl font-bold ${streakLevel.color} inline-block`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  delay: 0.8
                }}
              >
                {longestStreak}
              </motion.div>
              <div className="text-lg text-gray-300 mt-2">
                Day Longest Streak 🔥
              </div>
            </div>

            {/* Streak progress bar */}
            <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
              <motion.div
                className={`h-full ${streakLevel.color.replace('text-', 'bg-')} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${streakPercentage}%` }}
                transition={{ duration: 1.5, delay: 1 }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {streakPercentage.toFixed(1)}% of the year
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div variants={containerVariants} className="grid grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="bg-white/5 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-400">Current</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">{currentStreak}</div>
              <div className="text-xs text-gray-500">day streak</div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white/5 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Calendar className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-400">Active Days</span>
              </div>
              <div className="text-2xl font-bold text-green-400">{totalDays}</div>
              <div className="text-xs text-gray-500">total</div>
            </motion.div>
          </motion.div>

          {/* Motivational message */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-6"
          >
            {longestStreak >= 30 ? (
              <p className="text-gray-400">
                🎉 Incredible dedication! Your consistency is inspiring.
              </p>
            ) : longestStreak >= 14 ? (
              <p className="text-gray-400">
                💪 Great momentum! Keep building those coding habits.
              </p>
            ) : longestStreak >= 7 ? (
              <p className="text-gray-400">
                🌟 Good start! Consistency is the key to growth.
              </p>
            ) : (
              <p className="text-gray-400">
                🚀 Every commit counts! Ready to build your streak?
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}