'use client'

import { motion } from 'framer-motion'
import { Calendar, User, Github, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GitHubStatsData } from '@/hooks/use-github-stats'

interface WrappedHeaderProps {
  username: string
  year: number
  stats: GitHubStatsData
  isOwnWrapped: boolean
}

export default function WrappedHeader({ username, year, stats, isOwnWrapped }: WrappedHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 px-6 py-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          {/* Back button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.location.href = '/'}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Home
          </Button>

          {/* GitHub profile link */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open(`https://github.com/${username}`, '_blank')}
            className="text-gray-400 hover:text-white"
          >
            <Github className="w-4 h-4 mr-2" />
            View Profile
          </Button>
        </div>

        {/* Main header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center space-x-3 glass px-6 py-3 rounded-full mb-6"
          >
            <User className="w-5 h-5 text-primary-400" />
            <span className="font-medium">{username}</span>
            <div className="w-1 h-1 bg-gray-400 rounded-full" />
            <Calendar className="w-5 h-5 text-secondary-400" />
            <span className="font-medium">{year}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            {isOwnWrapped ? 'Your' : `${username}'s`}{' '}
            <span className="text-gradient">GitHub Wrapped</span>
            <br />
            <span className="text-3xl md:text-5xl">{year}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            {isOwnWrapped
              ? "Here's your incredible coding journey this year. Every commit, contribution, and line of code tells a story."
              : `Discover ${username}'s amazing coding journey in ${year}. A year of commits, contributions, and achievements.`
            }
          </motion.p>

          {/* Quick stats preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 text-sm"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-400">
                {stats.total_commits.toLocaleString()}
              </div>
              <div className="text-gray-400">Commits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary-400">
                {stats.total_repos.toLocaleString()}
              </div>
              <div className="text-gray-400">Repositories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {stats.total_stars_received.toLocaleString()}
              </div>
              <div className="text-gray-400">Stars Received</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {stats.streak_data.longest_streak}
              </div>
              <div className="text-gray-400">Day Streak</div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}