'use client'

import { motion } from 'framer-motion'
import { Calendar, TrendingUp, Zap, Target, Award, BarChart3 } from 'lucide-react'
import { GitHubStatsData } from '@/hooks/use-github-stats'

interface YearProgressCardProps {
  stats: GitHubStatsData
  username: string
  year: number
}

const months = [
  { name: 'Jan', short: 'J', season: 'winter', color: 'text-blue-300' },
  { name: 'Feb', short: 'F', season: 'winter', color: 'text-blue-400' },
  { name: 'Mar', short: 'M', season: 'spring', color: 'text-green-300' },
  { name: 'Apr', short: 'A', season: 'spring', color: 'text-green-400' },
  { name: 'May', short: 'M', season: 'spring', color: 'text-green-500' },
  { name: 'Jun', short: 'J', season: 'summer', color: 'text-yellow-400' },
  { name: 'Jul', short: 'J', season: 'summer', color: 'text-yellow-500' },
  { name: 'Aug', short: 'A', season: 'summer', color: 'text-orange-400' },
  { name: 'Sep', short: 'S', season: 'autumn', color: 'text-orange-500' },
  { name: 'Oct', short: 'O', season: 'autumn', color: 'text-red-400' },
  { name: 'Nov', short: 'N', season: 'autumn', color: 'text-red-500' },
  { name: 'Dec', short: 'D', season: 'winter', color: 'text-blue-500' },
]

export default function YearProgressCard({ stats, username, year }: YearProgressCardProps) {
  // Process contribution calendar to get monthly data
  const processMonthlyData = () => {
    const monthlyStats = Array(12).fill(0)

    Object.entries(stats.contribution_calendar || {}).forEach(([date, count]) => {
      const month = new Date(date).getMonth()
      monthlyStats[month] += count
    })

    return monthlyStats
  }

  const monthlyData = processMonthlyData()
  const maxMonthlyCommits = Math.max(...monthlyData)
  const totalYearCommits = monthlyData.reduce((sum, count) => sum + count, 0)

  // Find peak and low months
  const peakMonth = monthlyData.indexOf(maxMonthlyCommits)
  const lowMonth = monthlyData.indexOf(Math.min(...monthlyData.filter(count => count > 0)))

  // Calculate progress metrics
  const currentMonth = new Date().getMonth()
  const progressThroughYear = year === new Date().getFullYear()
    ? ((currentMonth + 1) / 12) * 100
    : 100

  // Determine coding season pattern
  const getSeasonPattern = () => {
    const seasonTotals = {
      winter: monthlyData[11] + monthlyData[0] + monthlyData[1], // Dec, Jan, Feb
      spring: monthlyData[2] + monthlyData[3] + monthlyData[4], // Mar, Apr, May
      summer: monthlyData[5] + monthlyData[6] + monthlyData[7], // Jun, Jul, Aug
      autumn: monthlyData[8] + monthlyData[9] + monthlyData[10], // Sep, Oct, Nov
    }

    const topSeason = Object.entries(seasonTotals)
      .sort(([,a], [,b]) => b - a)[0]

    const patterns = {
      winter: { name: 'Winter Warrior', emoji: '❄️', description: 'Peak productivity in the cold months' },
      spring: { name: 'Spring Sprinter', emoji: '🌸', description: 'Blooming with fresh energy' },
      summer: { name: 'Summer Swimmer', emoji: '☀️', description: 'Hot streak all season long' },
      autumn: { name: 'Autumn Achiever', emoji: '🍂', description: 'Harvesting results in the fall' },
    }

    return patterns[topSeason[0] as keyof typeof patterns] || patterns.spring
  }

  const seasonPattern = getSeasonPattern()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  }

  const monthVariants = {
    hidden: { opacity: 0, y: 20, scaleY: 0 },
    visible: {
      opacity: 1,
      y: 0,
      scaleY: 1,
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
        {/* Background decoration - seasonal waves */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent"
            animate={{
              background: [
                'linear-gradient(to bottom, rgba(59, 130, 246, 0.05), transparent)',
                'linear-gradient(to bottom, rgba(34, 197, 94, 0.05), transparent)',
                'linear-gradient(to bottom, rgba(234, 179, 8, 0.05), transparent)',
                'linear-gradient(to bottom, rgba(239, 68, 68, 0.05), transparent)',
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mb-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              >
                <BarChart3 className="w-6 h-6 text-white" />
              </motion.div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Year Progress</h2>
              <p className="text-gray-400">Your {year} coding journey</p>
            </div>
          </div>

          {/* Season pattern badge */}
          <motion.div
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.5 }}
          >
            <span className="text-2xl">{seasonPattern.emoji}</span>
            <span className="font-bold text-indigo-400">{seasonPattern.name}</span>
          </motion.div>
        </motion.div>

        {/* Monthly progress chart */}
        <motion.div
          variants={containerVariants}
          className="relative z-10 mb-6"
        >
          <div className="flex items-end justify-between space-x-1 h-32 mb-4">
            {months.map((month, index) => {
              const height = maxMonthlyCommits > 0 ? (monthlyData[index] / maxMonthlyCommits) * 100 : 0
              const isPeak = index === peakMonth
              const isLow = index === lowMonth && monthlyData[index] > 0

              return (
                <div key={month.name} className="flex-1 flex flex-col items-center">
                  {/* Month bar */}
                  <div className="relative w-full bg-white/10 rounded-t-lg overflow-hidden mb-2" style={{ height: '108px' }}>
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 rounded-t-lg transition-colors ${
                        isPeak
                          ? 'bg-gradient-to-t from-yellow-500 to-yellow-300'
                          : isLow
                          ? 'bg-gradient-to-t from-red-500 to-red-400'
                          : 'bg-gradient-to-t from-indigo-600 to-indigo-400'
                      }`}
                      variants={monthVariants}
                      style={{ height: `${height}%` }}
                      whileHover={{ scale: 1.05 }}
                    />

                    {/* Commits count */}
                    {monthlyData[index] > 0 && (
                      <motion.div
                        className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + index * 0.05 }}
                      >
                        {monthlyData[index]}
                      </motion.div>
                    )}

                    {/* Peak/Low indicators */}
                    {isPeak && (
                      <motion.div
                        className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.5, type: 'spring' }}
                      >
                        🔥
                      </motion.div>
                    )}
                  </div>

                  {/* Month label */}
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.05 }}
                  >
                    <div className={`text-xs font-medium ${month.color}`}>{month.short}</div>
                  </motion.div>
                </div>
              )
            })}
          </div>

          {/* Progress indicator for current year */}
          {year === new Date().getFullYear() && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-white/5 rounded-xl p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Year Progress</span>
                <span className="text-sm font-semibold text-indigo-400">{progressThroughYear.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <motion.div
                  className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressThroughYear}%` }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Key insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="relative z-10 grid grid-cols-2 gap-4"
        >
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <TrendingUp className="w-5 h-5 text-green-400 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-300">Peak Month</div>
            <div className="text-lg font-bold text-green-400">{months[peakMonth].name}</div>
            <div className="text-xs text-gray-500">{monthlyData[peakMonth]} commits</div>
          </div>

          <div className="bg-white/5 rounded-xl p-3 text-center">
            <Award className="w-5 h-5 text-purple-400 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-300">Total {year}</div>
            <div className="text-lg font-bold text-purple-400">{totalYearCommits}</div>
            <div className="text-xs text-gray-500">commits</div>
          </div>
        </motion.div>

        {/* Seasonal message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="relative z-10 text-center mt-4"
        >
          <p className="text-gray-400 text-sm">
            {seasonPattern.description} - your coding rhythm tells a story!
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}