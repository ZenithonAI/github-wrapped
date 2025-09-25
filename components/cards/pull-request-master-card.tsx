'use client'

import { motion } from 'framer-motion'
import { GitPullRequest, Users, CheckCircle, XCircle, Clock, Zap, Target, Award } from 'lucide-react'
import { GitHubStatsData } from '@/hooks/use-github-stats'

interface PullRequestMasterCardProps {
  stats: GitHubStatsData
  username: string
  year: number
}

export default function PullRequestMasterCard({ stats, username, year }: PullRequestMasterCardProps) {
  // Calculate PR metrics (using available stats and some mock data)
  const totalPRs = stats.total_prs || 0
  const approvalRate = Math.min(85 + Math.random() * 10, 95) // Mock approval rate 85-95%
  const averageReviewTime = Math.floor(2 + Math.random() * 4) // 2-6 hours
  const collaborationScore = Math.min(totalPRs * 2.5, 100)

  // Determine PR mastery level
  const getMasteryLevel = (prs: number) => {
    if (prs >= 100) return { level: 'PR Legend', emoji: '👑', color: 'text-yellow-400', bgColor: 'bg-yellow-400/20' }
    if (prs >= 50) return { level: 'PR Expert', emoji: '🚀', color: 'text-blue-400', bgColor: 'bg-blue-400/20' }
    if (prs >= 25) return { level: 'PR Pro', emoji: '💪', color: 'text-green-400', bgColor: 'bg-green-400/20' }
    if (prs >= 10) return { level: 'PR Contributor', emoji: '🌟', color: 'text-purple-400', bgColor: 'bg-purple-400/20' }
    if (prs >= 5) return { level: 'PR Starter', emoji: '🌱', color: 'text-orange-400', bgColor: 'bg-orange-400/20' }
    return { level: 'PR Beginner', emoji: '👋', color: 'text-gray-400', bgColor: 'bg-gray-400/20' }
  }

  const mastery = getMasteryLevel(totalPRs)

  // Mock PR categories distribution
  const prCategories = [
    { name: 'Features', count: Math.floor(totalPRs * 0.4), color: 'bg-green-500', icon: Zap },
    { name: 'Bug Fixes', count: Math.floor(totalPRs * 0.35), color: 'bg-red-500', icon: Target },
    { name: 'Improvements', count: Math.floor(totalPRs * 0.15), color: 'bg-blue-500', icon: CheckCircle },
    { name: 'Docs', count: Math.floor(totalPRs * 0.1), color: 'bg-purple-500', icon: Users },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        <div className="absolute inset-0 pointer-events-none">
          {/* Flowing lines representing PR flow */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-green-400/20 to-transparent"
              style={{
                left: `${20 + i * 12}%`,
                height: '100%',
              }}
              animate={{
                opacity: [0, 1, 0],
                scaleY: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}

          {/* Floating merge icons */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`merge-${i}`}
              className="absolute text-green-400/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 6 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              <GitPullRequest className="w-6 h-6" />
            </motion.div>
          ))}
        </div>

        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="relative z-10 mb-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 2, repeat: Infinity },
                }}
              >
                <GitPullRequest className="w-6 h-6 text-white" />
              </motion.div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Pull Request Master</h2>
              <p className="text-gray-400">Your collaboration excellence</p>
            </div>
          </div>

          {/* Mastery level badge */}
          <motion.div
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${mastery.bgColor}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.5 }}
          >
            <span className="text-2xl">{mastery.emoji}</span>
            <span className={`font-bold ${mastery.color}`}>{mastery.level}</span>
          </motion.div>
        </motion.div>

        {/* Main PR count */}
        <motion.div
          variants={itemVariants}
          className="relative z-10 text-center mb-6"
        >
          <motion.div
            className="text-6xl font-bold text-green-400 mb-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              delay: 0.8,
            }}
          >
            {totalPRs}
          </motion.div>
          <p className="text-lg text-gray-300 mb-4">Pull Requests Created</p>

          {/* Success metrics */}
          <div className="grid grid-cols-3 gap-4">
            <motion.div
              variants={itemVariants}
              className="bg-white/5 rounded-xl p-3 text-center"
            >
              <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-green-400">{approvalRate.toFixed(0)}%</div>
              <div className="text-xs text-gray-400">Approval Rate</div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white/5 rounded-xl p-3 text-center"
            >
              <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-blue-400">{averageReviewTime}h</div>
              <div className="text-xs text-gray-400">Avg Review Time</div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white/5 rounded-xl p-3 text-center"
            >
              <Award className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-purple-400">{collaborationScore.toFixed(0)}</div>
              <div className="text-xs text-gray-400">Collab Score</div>
            </motion.div>
          </div>
        </motion.div>

        {/* PR Categories */}
        <motion.div
          variants={containerVariants}
          className="relative z-10 space-y-3"
        >
          <h3 className="text-sm font-semibold text-center text-gray-300 mb-3">
            PR Breakdown by Type
          </h3>

          {prCategories.map((category, index) => {
            const Icon = category.icon
            const percentage = totalPRs > 0 ? (category.count / totalPRs) * 100 : 0

            return (
              <motion.div
                key={category.name}
                variants={itemVariants}
                className="flex items-center space-x-4"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <div className={`w-8 h-8 rounded-lg ${category.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{category.name}</span>
                      <span className="text-sm text-gray-400">{category.count}</span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${category.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: 1 + index * 0.1 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Motivational message */}
        <motion.div
          variants={itemVariants}
          className="relative z-10 text-center mt-6"
        >
          <p className="text-gray-400 text-sm">
            {totalPRs >= 50 ? (
              "🎉 Outstanding collaboration! You're driving innovation forward."
            ) : totalPRs >= 25 ? (
              "💪 Great momentum! Your contributions make a real impact."
            ) : totalPRs >= 10 ? (
              "🌟 Solid collaboration! Keep building and sharing."
            ) : (
              "🚀 Every PR counts! You're part of the open source community."
            )}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}