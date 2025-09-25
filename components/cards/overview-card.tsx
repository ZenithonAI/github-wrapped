'use client'

import { motion } from 'framer-motion'
import { GitBranch, Star, GitCommit, Zap, TrendingUp } from 'lucide-react'
import { GitHubStatsData } from '@/hooks/use-github-stats'

interface OverviewCardProps {
  stats: GitHubStatsData
  username: string
  year: number
}

export default function OverviewCard({ stats, username, year }: OverviewCardProps) {
  const statsItems = [
    {
      icon: GitCommit,
      label: 'Commits',
      value: stats.total_commits,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      icon: GitBranch,
      label: 'Repositories',
      value: stats.total_repos,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      icon: Star,
      label: 'Stars Received',
      value: stats.total_stars_received,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
    },
    {
      icon: TrendingUp,
      label: 'Pull Requests',
      value: stats.total_prs,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
  ]

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
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
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
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-secondary-500/5 to-primary-500/5 rounded-full translate-y-12 -translate-x-12" />

        {/* Header */}
        <motion.div variants={itemVariants} className="relative z-10 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Year Overview</h2>
              <p className="text-gray-400">Your {year} GitHub activity</p>
            </div>
          </div>

          <motion.div
            className="h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={containerVariants}
          className="relative z-10 grid grid-cols-2 gap-6"
        >
          {statsItems.map((item, index) => {
            const Icon = item.icon

            return (
              <motion.div
                key={item.label}
                variants={itemVariants}
                className="relative group"
              >
                <div className={`${item.bgColor} rounded-2xl p-6 transition-all duration-300 group-hover:scale-105`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg ${item.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>

                    {/* Sparkle effect */}
                    <motion.div
                      className="text-2xl"
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: index * 0.5,
                      }}
                    >
                      ✨
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    <motion.div
                      className={`text-3xl font-bold ${item.color}`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 200,
                        delay: 0.8 + index * 0.1,
                      }}
                    >
                      {item.value.toLocaleString()}
                    </motion.div>
                    <div className="text-gray-300 font-medium">{item.label}</div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Footer message */}
        <motion.div
          variants={itemVariants}
          className="relative z-10 mt-8 text-center"
        >
          <p className="text-gray-400">
            {username === 'me' ? 'You' : username} made an incredible impact in {year}! 🚀
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}