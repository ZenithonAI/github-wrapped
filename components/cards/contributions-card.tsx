'use client'

import { motion } from 'framer-motion'
import { Calendar, Flame, Target, TrendingUp } from 'lucide-react'
import { GitHubStatsData } from '@/hooks/use-github-stats'

interface ContributionsCardProps {
  stats: GitHubStatsData
  username: string
  year: number
}

export default function ContributionsCard({ stats, username, year }: ContributionsCardProps) {
  // Process contribution calendar data
  const contributions = Object.entries(stats.contribution_calendar || {})
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // Calculate stats
  const totalDays = contributions.length
  const activeDays = contributions.filter(day => day.count > 0).length
  const maxDayContributions = Math.max(...contributions.map(day => day.count), 0)
  const averageDaily = totalDays > 0 ? stats.total_commits / totalDays : 0

  // Find most productive month
  const monthlyStats: Record<string, number> = {}
  contributions.forEach(({ date, count }) => {
    const month = new Date(date).toLocaleString('default', { month: 'long' })
    monthlyStats[month] = (monthlyStats[month] || 0) + count
  })

  const mostProductiveMonth = Object.entries(monthlyStats)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'

  // Create heatmap visualization (simplified)
  const getHeatmapColor = (count: number) => {
    if (count === 0) return 'bg-gray-800'
    if (count <= 2) return 'bg-green-900'
    if (count <= 5) return 'bg-green-700'
    if (count <= 10) return 'bg-green-500'
    return 'bg-green-400'
  }

  // Sample weeks for visualization (showing pattern)
  const sampleWeeks = Array.from({ length: 52 }, (_, weekIndex) => {
    return Array.from({ length: 7 }, (_, dayIndex) => {
      const contributionIndex = weekIndex * 7 + dayIndex
      return contributions[contributionIndex] || { date: '', count: 0 }
    })
  })

  return (
    <motion.div
      className="w-full max-w-2xl aspect-[4/3] relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Card background */}
      <div className="absolute inset-0 glass-card p-6 overflow-hidden">
        {/* Background decoration */}
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mb-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Contributions</h2>
              <p className="text-gray-400">Your coding activity</p>
            </div>
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative z-10 grid grid-cols-2 gap-4 mb-6"
        >
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">Active Days</span>
            </div>
            <div className="text-2xl font-bold text-green-400">
              {activeDays}
            </div>
            <div className="text-xs text-gray-500">
              {((activeDays / totalDays) * 100).toFixed(1)}% of year
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-sm text-gray-400">Best Day</span>
            </div>
            <div className="text-2xl font-bold text-orange-400">
              {maxDayContributions}
            </div>
            <div className="text-xs text-gray-500">
              commits in one day
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-400">Daily Avg</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">
              {averageDaily.toFixed(1)}
            </div>
            <div className="text-xs text-gray-500">
              commits per day
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-gray-400">Top Month</span>
            </div>
            <div className="text-sm font-bold text-purple-400">
              {mostProductiveMonth}
            </div>
            <div className="text-xs text-gray-500">
              most productive
            </div>
          </div>
        </motion.div>

        {/* Mini heatmap visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative z-10 bg-white/5 rounded-xl p-4"
        >
          <div className="text-sm font-medium mb-3 text-center">
            {year} Contribution Heatmap
          </div>

          {/* Simplified heatmap grid */}
          <div className="space-y-1">
            {sampleWeeks.slice(0, 8).map((week, weekIndex) => (
              <motion.div
                key={weekIndex}
                className="flex space-x-1 justify-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + weekIndex * 0.1, duration: 0.3 }}
              >
                {week.map((day, dayIndex) => (
                  <motion.div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-2 h-2 rounded-sm ${getHeatmapColor(day.count)}`}
                    whileHover={{ scale: 1.5 }}
                    title={`${day.count} contributions`}
                  />
                ))}
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-2 mt-3">
            <span className="text-xs text-gray-500">Less</span>
            {[0, 2, 5, 10, 15].map(level => (
              <div
                key={level}
                className={`w-2 h-2 rounded-sm ${getHeatmapColor(level)}`}
              />
            ))}
            <span className="text-xs text-gray-500">More</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}