'use client'

import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, Zap, Target, Rocket, Brain, Star, Gem } from 'lucide-react'
import { GitHubStatsData } from '@/hooks/use-github-stats'

interface PredictionsCardProps {
  stats: GitHubStatsData
  username: string
  year: number
}

// Generate AI-powered predictions based on coding patterns
const generatePredictions = (stats: GitHubStatsData, username: string, year: number) => {
  const totalCommits = stats.total_commits
  const topLanguages = Object.keys(stats.most_used_languages).slice(0, 3)
  const streakData = stats.streak_data
  const nextYear = year + 1

  const predictions = []

  // Commit prediction based on current trend
  const predictedCommits = Math.floor(totalCommits * (1.1 + Math.random() * 0.4)) // 10-50% growth
  predictions.push({
    icon: TrendingUp,
    category: 'Productivity',
    prediction: `${predictedCommits}+ commits in ${nextYear}`,
    description: 'Based on your consistent coding patterns',
    confidence: 85,
    color: 'text-green-400',
  })

  // Language evolution prediction
  const emergingLanguages = ['Rust', 'Go', 'TypeScript', 'Kotlin', 'Swift', 'Julia', 'Zig']
  const newLanguage = emergingLanguages.find(lang => !topLanguages.includes(lang)) || 'Rust'
  predictions.push({
    icon: Brain,
    category: 'Skills',
    prediction: `Will master ${newLanguage}`,
    description: 'Your learning curve suggests new language adoption',
    confidence: 72,
    color: 'text-blue-400',
  })

  // Project prediction
  const projectTypes = [
    'AI-powered application',
    'Open source library',
    'Mobile application',
    'Web framework',
    'Developer tool',
    'Game engine',
  ]
  const randomProject = projectTypes[Math.floor(Math.random() * projectTypes.length)]
  predictions.push({
    icon: Rocket,
    category: 'Innovation',
    prediction: `Will build a ${randomProject}`,
    description: 'Your repository patterns indicate ambitious projects ahead',
    confidence: 68,
    color: 'text-purple-400',
  })

  // Collaboration prediction
  if (stats.total_prs > 10) {
    predictions.push({
      icon: Star,
      category: 'Community',
      prediction: 'Will become a core contributor',
      description: 'Your PR activity shows growing open source involvement',
      confidence: 78,
      color: 'text-yellow-400',
    })
  } else {
    predictions.push({
      icon: Zap,
      category: 'Growth',
      prediction: 'Will double repository stars',
      description: 'Your coding quality is gaining recognition',
      confidence: 65,
      color: 'text-orange-400',
    })
  }

  // Streak prediction
  const targetStreak = Math.max(streakData?.longest_streak || 0, 50)
  predictions.push({
    icon: Target,
    category: 'Consistency',
    prediction: `${targetStreak}+ day coding streak`,
    description: 'Your dedication pattern suggests sustained momentum',
    confidence: 70,
    color: 'text-red-400',
  })

  return predictions.slice(0, 4) // Return top 4 predictions
}

export default function PredictionsCard({ stats, username, year }: PredictionsCardProps) {
  const predictions = stats.ai_insights?.predictions?.length > 0
    ? stats.ai_insights.predictions.map((pred: string, index: number) => ({
        icon: [TrendingUp, Brain, Rocket, Star][index] || Sparkles,
        category: ['Growth', 'Skills', 'Innovation', 'Achievement'][index] || 'Future',
        prediction: pred,
        description: 'AI-generated prediction based on your patterns',
        confidence: 75 + Math.floor(Math.random() * 20),
        color: ['text-green-400', 'text-blue-400', 'text-purple-400', 'text-yellow-400'][index] || 'text-gray-400',
      }))
    : generatePredictions(stats, username, year)

  const nextYear = year + 1
  const averageConfidence = predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length

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

  const predictionVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const crystalVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 10,
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
        {/* Background decoration - mystical aura */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Glowing orbs */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-16 h-16 rounded-full bg-gradient-radial from-purple-400/10 to-transparent`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.3, 0.1],
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}

          {/* Floating crystal particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`crystal-${i}`}
              className="absolute text-cyan-400/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: [0, 360],
                y: [0, -30, 0],
                scale: [0.5, 1, 0.5],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              💎
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
              className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center"
              variants={crystalVariants}
            >
              <Gem className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold">{nextYear} Predictions</h2>
              <p className="text-gray-400">AI-powered future insights</p>
            </div>
          </div>

          {/* Confidence meter */}
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-400">AI Confidence:</span>
            <div className="flex-1 bg-gray-800 rounded-full h-2">
              <motion.div
                className="h-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${averageConfidence}%` }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </div>
            <span className="text-sm font-semibold text-cyan-400">{averageConfidence.toFixed(0)}%</span>
          </div>
        </motion.div>

        {/* Predictions grid */}
        <motion.div
          variants={containerVariants}
          className="relative z-10 space-y-4"
        >
          {predictions.map((prediction, index) => {
            const Icon = prediction.icon

            return (
              <motion.div
                key={index}
                variants={predictionVariants}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${prediction.color}`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        {prediction.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs text-green-400">{prediction.confidence}%</span>
                      </div>
                    </div>

                    <h3 className={`font-bold text-lg ${prediction.color} mb-1`}>
                      {prediction.prediction}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {prediction.description}
                    </p>
                  </div>

                  {/* Mystical glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(45deg, ${prediction.color.includes('green') ? '#10b981' :
                        prediction.color.includes('blue') ? '#3b82f6' :
                        prediction.color.includes('purple') ? '#8b5cf6' :
                        prediction.color.includes('yellow') ? '#f59e0b' :
                        prediction.color.includes('red') ? '#ef4444' :
                        '#06b6d4'
                      }20, transparent)`,
                    }}
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Mystical footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="relative z-10 text-center mt-6"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 font-semibold">The future is unwritten</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-gray-400 text-sm">
            These predictions are based on AI analysis of your {year} coding patterns.
            <br />
            Your actual journey may be even more amazing! ✨
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}