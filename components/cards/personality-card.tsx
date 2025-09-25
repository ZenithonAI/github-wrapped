'use client'

import { motion } from 'framer-motion'
import { Brain, Sparkles, User, Code } from 'lucide-react'
import { GitHubStatsData } from '@/hooks/use-github-stats'

interface PersonalityCardProps {
  stats: GitHubStatsData
  username: string
  year: number
}

// Personality archetypes with descriptions
const personalityTypes = {
  'The Architect': {
    description: 'You build robust, well-structured systems that stand the test of time.',
    traits: ['Systematic', 'Thoughtful', 'Reliable'],
    emoji: '🏗️'
  },
  'The Explorer': {
    description: 'You love experimenting with new technologies and pushing boundaries.',
    traits: ['Curious', 'Innovative', 'Adventurous'],
    emoji: '🚀'
  },
  'The Craftsperson': {
    description: 'You take pride in writing clean, elegant code that others admire.',
    traits: ['Meticulous', 'Artistic', 'Perfectionist'],
    emoji: '🎨'
  },
  'The Collaborator': {
    description: 'You thrive in team environments and love helping others grow.',
    traits: ['Supportive', 'Communicative', 'Empathetic'],
    emoji: '🤝'
  },
  'The Problem Solver': {
    description: 'You tackle complex challenges with analytical thinking and persistence.',
    traits: ['Logical', 'Persistent', 'Strategic'],
    emoji: '🧩'
  },
  'The Innovator': {
    description: 'You create solutions that didn\'t exist before and inspire others.',
    traits: ['Creative', 'Visionary', 'Bold'],
    emoji: '💡'
  }
}

export default function PersonalityCard({ stats, username, year }: PersonalityCardProps) {
  // Generate personality based on stats (simplified algorithm)
  const generatePersonality = () => {
    const { total_commits, total_repos, total_prs, most_used_languages } = stats
    const languageCount = Object.keys(most_used_languages).length

    if (total_prs > 50 && total_commits > 300) {
      return 'The Collaborator'
    } else if (languageCount >= 5 && total_repos > 15) {
      return 'The Explorer'
    } else if (total_commits > 500 && total_repos < 10) {
      return 'The Craftsperson'
    } else if (total_repos > 20) {
      return 'The Innovator'
    } else if (total_commits > 200) {
      return 'The Problem Solver'
    } else {
      return 'The Architect'
    }
  }

  const personalityType = generatePersonality()
  const personality = personalityTypes[personalityType as keyof typeof personalityTypes]

  // Get actual traits from stats or use defaults
  const actualTraits = stats.personality_traits.length > 0
    ? stats.personality_traits.slice(0, 3)
    : personality.traits

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

  const floatingVariants = {
    float: {
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
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
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-6 text-primary-300/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [0.5, 1, 0.5],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>

        {/* Header */}
        <motion.div variants={itemVariants} className="relative z-10 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center"
              variants={floatingVariants}
              animate="float"
            >
              <Brain className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold">Your Dev Personality</h2>
              <p className="text-gray-400">Based on {year} activity</p>
            </div>
          </div>
        </motion.div>

        {/* Main personality display */}
        <motion.div variants={containerVariants} className="relative z-10 text-center mb-8">
          {/* Personality type */}
          <motion.div
            variants={itemVariants}
            className="mb-6"
          >
            <motion.div
              className="text-6xl mb-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
            >
              {personality.emoji}
            </motion.div>
            <h3 className="text-3xl font-bold text-gradient mb-3">
              {personalityType}
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md mx-auto">
              {personality.description}
            </p>
          </motion.div>

          {/* Traits */}
          <motion.div variants={containerVariants} className="space-y-3">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <User className="w-5 h-5 text-purple-400" />
              <span className="text-lg font-semibold text-purple-400">Key Traits</span>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {actualTraits.map((trait, index) => (
                <motion.div
                  key={trait}
                  variants={itemVariants}
                  className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-full px-4 py-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-white font-medium">{trait}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* AI insights teaser */}
        <motion.div
          variants={itemVariants}
          className="relative z-10 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-xl p-4 text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <Code className="w-4 h-4 text-indigo-400" />
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-sm text-gray-300">
            {stats.ai_insights?.personality_type ?
              `AI Analysis: ${stats.ai_insights.personality_type}` :
              'Upgrade to Pro for AI-powered personality insights and custom analysis!'
            }
          </p>
        </motion.div>

        {/* Fun coding fact */}
        <motion.div
          variants={itemVariants}
          className="relative z-10 text-center mt-6"
        >
          <p className="text-sm text-gray-400">
            💫 Your unique coding style makes the developer community stronger!
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}