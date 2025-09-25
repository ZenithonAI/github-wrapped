'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Award, Star, Zap, Target, Crown, Medal, Shield } from 'lucide-react'
import { GitHubStatsData } from '@/hooks/use-github-stats'

interface AchievementHunterCardProps {
  stats: GitHubStatsData
  username: string
  year: number
}

// Achievement definitions with unlock conditions
const achievements = [
  {
    id: 'first_commit',
    name: 'Hello World',
    description: 'Made your first commit',
    icon: Star,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/20',
    rarity: 'Common',
    check: (stats: GitHubStatsData) => stats.total_commits > 0,
  },
  {
    id: 'century_club',
    name: 'Century Club',
    description: '100+ commits in a year',
    icon: Trophy,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/20',
    rarity: 'Rare',
    check: (stats: GitHubStatsData) => stats.total_commits >= 100,
  },
  {
    id: 'streak_master',
    name: 'Streak Master',
    description: '30+ day coding streak',
    icon: Zap,
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/20',
    rarity: 'Epic',
    check: (stats: GitHubStatsData) => stats.streak_data?.longest_streak >= 30,
  },
  {
    id: 'polyglot',
    name: 'Polyglot',
    description: 'Used 5+ programming languages',
    icon: Target,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/20',
    rarity: 'Rare',
    check: (stats: GitHubStatsData) => Object.keys(stats.most_used_languages).length >= 5,
  },
  {
    id: 'star_collector',
    name: 'Star Collector',
    description: 'Received 50+ stars',
    icon: Star,
    color: 'text-pink-400',
    bgColor: 'bg-pink-400/20',
    rarity: 'Epic',
    check: (stats: GitHubStatsData) => stats.total_stars_received >= 50,
  },
  {
    id: 'pr_champion',
    name: 'PR Champion',
    description: 'Created 25+ pull requests',
    icon: Crown,
    color: 'text-green-400',
    bgColor: 'bg-green-400/20',
    rarity: 'Epic',
    check: (stats: GitHubStatsData) => stats.total_prs >= 25,
  },
  {
    id: 'commit_legend',
    name: 'Commit Legend',
    description: '500+ commits in a year',
    icon: Medal,
    color: 'text-red-400',
    bgColor: 'bg-red-400/20',
    rarity: 'Legendary',
    check: (stats: GitHubStatsData) => stats.total_commits >= 500,
  },
  {
    id: 'repo_creator',
    name: 'Repository Creator',
    description: 'Created 10+ repositories',
    icon: Shield,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/20',
    rarity: 'Rare',
    check: (stats: GitHubStatsData) => stats.total_repos >= 10,
  },
]

const rarityColors = {
  Common: 'text-gray-400',
  Rare: 'text-blue-400',
  Epic: 'text-purple-400',
  Legendary: 'text-yellow-400',
}

export default function AchievementHunterCard({ stats, username, year }: AchievementHunterCardProps) {
  // Check which achievements are unlocked
  const unlockedAchievements = achievements.filter(achievement =>
    achievement.check(stats)
  )

  const lockedAchievements = achievements.filter(achievement =>
    !achievement.check(stats)
  )

  const achievementScore = unlockedAchievements.length * 100 +
    (unlockedAchievements.filter(a => a.rarity === 'Epic').length * 200) +
    (unlockedAchievements.filter(a => a.rarity === 'Legendary').length * 500)

  const completionRate = (unlockedAchievements.length / achievements.length) * 100

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

  const achievementVariants = {
    hidden: { opacity: 0, scale: 0, rotateY: 180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
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
          {/* Floating trophy icons */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-400/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [0.5, 1, 0.5],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <Trophy className="w-8 h-8" />
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
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 10, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 2, repeat: Infinity },
                }}
              >
                <Trophy className="w-6 h-6 text-white" />
              </motion.div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Achievement Hunter</h2>
              <p className="text-gray-400">Your coding milestones</p>
            </div>
          </div>

          {/* Stats summary */}
          <div className="flex items-center space-x-6 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{unlockedAchievements.length}</div>
              <div className="text-xs text-gray-400">Unlocked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{achievementScore}</div>
              <div className="text-xs text-gray-400">Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{completionRate.toFixed(0)}%</div>
              <div className="text-xs text-gray-400">Complete</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-800 rounded-full h-2">
            <motion.div
              className="h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Achievement grid */}
        <motion.div
          variants={containerVariants}
          className="relative z-10 grid grid-cols-4 gap-3 mb-4"
        >
          {unlockedAchievements.slice(0, 8).map((achievement, index) => {
            const Icon = achievement.icon

            return (
              <motion.div
                key={achievement.id}
                variants={achievementVariants}
                className={`${achievement.bgColor} border-2 border-transparent hover:border-white/20 rounded-xl p-3 cursor-pointer group transition-all duration-300`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <div className={`w-8 h-8 rounded-lg ${achievement.bgColor} flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 ${achievement.color}`} />
                  </div>
                  <div className="text-xs font-semibold text-white truncate" title={achievement.name}>
                    {achievement.name}
                  </div>
                  <div className={`text-xs ${rarityColors[achievement.rarity as keyof typeof rarityColors]} mt-1`}>
                    {achievement.rarity}
                  </div>
                </div>

                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="bg-black/90 backdrop-blur-sm rounded-lg p-2 text-xs text-white whitespace-nowrap">
                    {achievement.description}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Next achievement to unlock */}
        {lockedAchievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="relative z-10 bg-white/5 border border-dashed border-white/20 rounded-xl p-4"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gray-600/50 flex items-center justify-center">
                {React.createElement(lockedAchievements[0].icon, { className: "w-5 h-5 text-gray-400" })}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-300">Next Achievement</h4>
                <p className="text-sm text-gray-400">{lockedAchievements[0].name}</p>
                <p className="text-xs text-gray-500">{lockedAchievements[0].description}</p>
              </div>
              <div className="text-right">
                <div className={`text-sm ${rarityColors[lockedAchievements[0].rarity as keyof typeof rarityColors]}`}>
                  {lockedAchievements[0].rarity}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Congratulatory message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="relative z-10 text-center mt-4"
        >
          <p className="text-gray-400 text-sm">
            {completionRate >= 75 ? (
              "🏆 Achievement Master! You've conquered most challenges!"
            ) : completionRate >= 50 ? (
              "⭐ Great progress! You're halfway to achievement mastery!"
            ) : completionRate >= 25 ? (
              "🎯 Good start! Keep coding to unlock more achievements!"
            ) : (
              "🌟 Every coder starts somewhere. Your journey to greatness begins!"
            )}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}