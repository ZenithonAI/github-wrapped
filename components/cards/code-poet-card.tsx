'use client'

import { motion } from 'framer-motion'
import { Feather, Sparkles, BookOpen, Heart, Quote } from 'lucide-react'
import { GitHubStatsData } from '@/hooks/use-github-stats'

interface CodePoetCardProps {
  stats: GitHubStatsData
  username: string
  year: number
}

// Sample poems inspired by coding themes - in real app, these would be AI-generated
const generatePoem = (stats: GitHubStatsData, username: string, year: number) => {
  const topLanguage = Object.keys(stats.most_used_languages)[0] || 'code'
  const totalCommits = stats.total_commits

  const poemTemplates = [
    {
      title: 'The Developer\'s Journey',
      verses: [
        `In ${year}, ${username} wrote with grace,`,
        `${totalCommits} commits, each finding its place.`,
        `With ${topLanguage} as their brush so bright,`,
        `They painted solutions through day and night.`,
        '',
        'Lines of logic, functions so true,',
        'Building tomorrow with code tried and new.',
        'Each bug conquered, each feature complete—',
        'A digital symphony, rhythmic and sweet.'
      ]
    },
    {
      title: 'Code Haiku',
      verses: [
        `${totalCommits} commits flow`,
        `Through ${topLanguage}'s syntax garden—`,
        'Dreams compiled true.'
      ]
    },
    {
      title: 'The Commit Chronicles',
      verses: [
        `In the realm of ${topLanguage}, where variables dance,`,
        `${username} wielded keyboard with masterful stance.`,
        `Each commit a story, each push a new verse,`,
        `Building the future, for better, not worse.`,
        '',
        `${year} brought challenges, bugs to debug,`,
        'But with patience and skill, they pulled every plug.',
        'Functions and classes, all perfectly aligned—',
        'A testament to their brilliant mind.'
      ]
    }
  ]

  // Choose poem based on commit count
  if (totalCommits >= 500) return poemTemplates[2]
  if (totalCommits >= 100) return poemTemplates[0]
  return poemTemplates[1]
}

export default function CodePoetCard({ stats, username, year }: CodePoetCardProps) {
  const poem = stats.ai_insights?.poem || generatePoem(stats, username, year)
  const poemData = typeof poem === 'string' ?
    { title: 'Your Coding Poem', verses: poem.split('\n') } :
    poem

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  }

  const verseVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const sparkleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
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
        {/* Background decoration - floating words and symbols */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating code symbols */}
          {['{}', '()', '[]', '<>', '&&', '||', '==', '=>'].map((symbol, i) => (
            <motion.div
              key={symbol}
              className="absolute text-purple-300/10 font-mono text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              {symbol}
            </motion.div>
          ))}

          {/* Poetic sparkles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute text-pink-400/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              ✨
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
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Feather className="w-6 h-6 text-white" />
              </motion.div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Code Poet</h2>
              <p className="text-gray-400">Your coding journey in verse</p>
            </div>
          </div>

          {/* Quote decoration */}
          <motion.div
            className="flex items-center justify-center space-x-2 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <Quote className="w-6 h-6 text-purple-400" />
            <span className="text-purple-400 font-semibold">AI-Generated from your commits</span>
            <Quote className="w-6 h-6 text-purple-400 transform scale-x-[-1]" />
          </motion.div>
        </motion.div>

        {/* Poem content */}
        <motion.div
          variants={containerVariants}
          className="relative z-10 flex-1"
        >
          {/* Poem title */}
          <motion.h3
            className="text-xl font-bold text-center mb-6 text-gradient bg-gradient-to-r from-purple-400 to-pink-400"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {poemData.title}
          </motion.h3>

          {/* Poem verses */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="space-y-3 text-center">
              {poemData.verses.map((verse: string, index: number) => (
                <motion.div
                  key={index}
                  variants={verseVariants}
                  className={`${verse.trim() === '' ? 'h-2' : 'text-gray-200'} ${
                    verse.includes('—') || verse.includes(':') ? 'text-purple-300 italic' : ''
                  }`}
                  style={{
                    fontSize: verse.length < 30 ? '1.1rem' : '1rem',
                    lineHeight: '1.6',
                  }}
                >
                  {verse || '\u00A0'}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Decorative elements around poem */}
          <motion.div
            className="absolute -top-4 -left-2"
            variants={sparkleVariants}
          >
            <Sparkles className="w-8 h-8 text-purple-400/50" />
          </motion.div>

          <motion.div
            className="absolute -bottom-4 -right-2"
            variants={sparkleVariants}
            transition={{ delay: 0.5 }}
          >
            <Heart className="w-6 h-6 text-pink-400/50" />
          </motion.div>
        </motion.div>

        {/* Footer with poetic stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="relative z-10 mt-6"
        >
          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 font-medium">{stats.total_commits}</span>
              <span className="text-gray-400">verses (commits)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Feather className="w-4 h-4 text-pink-400" />
              <span className="text-pink-400 font-medium">{Object.keys(stats.most_used_languages).length}</span>
              <span className="text-gray-400">languages</span>
            </div>
          </div>

          <motion.p
            className="text-center text-gray-400 text-sm mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            ✨ Your code tells a story - let AI capture its poetry ✨
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  )
}