'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Coffee, Moon, Sun, Zap } from 'lucide-react'
import { GitHubStatsData } from '@/hooks/use-github-stats'

interface WeekdayWarriorCardProps {
  stats: GitHubStatsData
  username: string
  year: number
}

const weekdays = [
  { name: 'Monday', short: 'Mon', icon: Coffee, color: 'text-blue-400' },
  { name: 'Tuesday', short: 'Tue', icon: Zap, color: 'text-green-400' },
  { name: 'Wednesday', short: 'Wed', icon: Sun, color: 'text-yellow-400' },
  { name: 'Thursday', short: 'Thu', icon: Clock, color: 'text-orange-400' },
  { name: 'Friday', short: 'Fri', icon: Calendar, color: 'text-purple-400' },
  { name: 'Saturday', short: 'Sat', icon: Moon, color: 'text-indigo-400' },
  { name: 'Sunday', short: 'Sun', icon: Coffee, color: 'text-pink-400' },
]

export default function WeekdayWarriorCard({ stats, username, year }: WeekdayWarriorCardProps) {
  // Process contribution calendar to get weekday distribution
  const processWeekdayData = () => {
    const weekdayStats = Array(7).fill(0) // Monday = 0, Sunday = 6

    Object.entries(stats.contribution_calendar || {}).forEach(([date, count]) => {
      const dayOfWeek = new Date(date).getDay() // 0 = Sunday, 6 = Saturday
      const mondayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1 // Convert to Monday = 0
      weekdayStats[mondayIndex] += count
    })

    return weekdayStats
  }

  const weekdayData = processWeekdayData()
  const maxCommits = Math.max(...weekdayData)
  const totalCommits = weekdayData.reduce((sum, count) => sum + count, 0)

  // Find favorite day
  const favoriteDay = weekdayData.indexOf(maxCommits)
  const favoriteDayData = weekdays[favoriteDay]

  // Calculate percentages
  const weekdayPercentages = weekdayData.map(count =>
    totalCommits > 0 ? (count / totalCommits) * 100 : 0
  )

  // Determine warrior type
  const getWarriorType = () => {
    const weekendCommits = weekdayData[5] + weekdayData[6] // Sat + Sun
    const weekdayCommits = weekdayData.slice(0, 5).reduce((sum, count) => sum + count, 0)
    const weekendRatio = totalCommits > 0 ? weekendCommits / totalCommits : 0

    if (weekendRatio > 0.4) return { type: 'Weekend Warrior', emoji: '🏖️', color: 'text-cyan-400' }
    if (favoriteDay === 0) return { type: 'Monday Motivator', emoji: '💪', color: 'text-blue-400' }
    if (favoriteDay === 4) return { type: 'Friday Finisher', emoji: '🎉', color: 'text-purple-400' }
    if (favoriteDay >= 1 && favoriteDay <= 3) return { type: 'Midweek Machine', emoji: '⚡', color: 'text-green-400' }
    return { type: 'Consistent Coder', emoji: '🔄', color: 'text-gray-400' }
  }

  const warriorType = getWarriorType()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const barVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: (percentage: number) => ({
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: Math.random() * 0.5,
      },
    }),
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
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          {weekdays.map((day, index) => (
            <motion.div
              key={day.name}
              className={`absolute w-8 h-8 ${day.color} opacity-5 rounded-full`}
              style={{
                left: `${15 + index * 12}%`,
                top: `${20 + Math.sin(index) * 30}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{
                duration: 4 + index * 0.5,
                repeat: Infinity,
                delay: index * 0.3,
              }}
            >
              <day.icon className="w-full h-full" />
            </motion.div>
          ))}
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mb-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <motion.div
              className={`w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center`}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Calendar className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold">Weekday Warrior</h2>
              <p className="text-gray-400">Your weekly coding rhythm</p>
            </div>
          </div>

          {/* Warrior type badge */}
          <motion.div
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.5 }}
          >
            <span className="text-2xl">{warriorType.emoji}</span>
            <span className={`font-bold ${warriorType.color}`}>{warriorType.type}</span>
          </motion.div>
        </motion.div>

        {/* Weekday chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative z-10 mb-6"
        >
          <div className="flex items-end justify-between space-x-2 h-32 mb-4">
            {weekdays.map((day, index) => {
              const Icon = day.icon
              const percentage = weekdayPercentages[index]
              const height = maxCommits > 0 ? (weekdayData[index] / maxCommits) * 100 : 0
              const isFavorite = index === favoriteDay

              return (
                <div key={day.name} className="flex-1 flex flex-col items-center">
                  {/* Bar */}
                  <div className="relative w-full bg-white/10 rounded-t-lg overflow-hidden mb-2" style={{ height: '96px' }}>
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 rounded-t-lg ${
                        isFavorite
                          ? 'bg-gradient-to-t from-yellow-500 to-yellow-300'
                          : 'bg-gradient-to-t from-indigo-600 to-indigo-400'
                      }`}
                      custom={percentage}
                      variants={barVariants}
                      style={{ height: `${height}%` }}
                      whileHover={{ scale: 1.05 }}
                    />

                    {/* Commits count */}
                    {weekdayData[index] > 0 && (
                      <motion.div
                        className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + index * 0.1 }}
                      >
                        {weekdayData[index]}
                      </motion.div>
                    )}

                    {/* Favorite day indicator */}
                    {isFavorite && (
                      <motion.div
                        className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.5, type: 'spring' }}
                      >
                        👑
                      </motion.div>
                    )}
                  </div>

                  {/* Day label */}
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <Icon className={`w-4 h-4 ${day.color} mx-auto mb-1`} />
                    <div className="text-xs font-medium text-gray-300">{day.short}</div>
                    <div className="text-xs text-gray-500">{percentage.toFixed(0)}%</div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Stats summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="relative z-10 bg-white/5 rounded-xl p-4 text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <favoriteDayData.icon className={`w-5 h-5 ${favoriteDayData.color}`} />
            <span className="font-semibold">Most Active Day</span>
          </div>
          <div className={`text-2xl font-bold ${favoriteDayData.color} mb-2`}>
            {favoriteDayData.name}
          </div>
          <div className="text-sm text-gray-400">
            {weekdayData[favoriteDay]} commits ({weekdayPercentages[favoriteDay].toFixed(1)}% of total)
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}