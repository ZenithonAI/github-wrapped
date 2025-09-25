'use client'

import { motion } from 'framer-motion'
import { Code2, Trophy, Palette } from 'lucide-react'
import { GitHubStatsData } from '@/hooks/use-github-stats'

interface LanguagesCardProps {
  stats: GitHubStatsData
  username: string
  year: number
}

// GitHub language colors (subset)
const languageColors: Record<string, string> = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3776ab',
  Java: '#ed8b00',
  'C++': '#00599c',
  C: '#a8b9cc',
  'C#': '#239120',
  PHP: '#777bb4',
  Ruby: '#cc342d',
  Go: '#00add8',
  Rust: '#000000',
  Swift: '#fa7343',
  Kotlin: '#7f52ff',
  Dart: '#0175c2',
  HTML: '#e34f26',
  CSS: '#1572b6',
  Shell: '#89e051',
  Vue: '#4fc08d',
  React: '#61dafb',
}

export default function LanguagesCard({ stats, username, year }: LanguagesCardProps) {
  // Process and sort languages
  const languages = Object.entries(stats.most_used_languages)
    .map(([name, bytes]) => ({ name, bytes, percentage: 0 }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 6) // Top 6 languages

  const totalBytes = languages.reduce((sum, lang) => sum + lang.bytes, 0)
  languages.forEach(lang => {
    lang.percentage = (lang.bytes / totalBytes) * 100
  })

  const topLanguage = languages[0]?.name || 'Code'

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
    hidden: { width: 0, opacity: 0 },
    visible: (percentage: number) => ({
      width: `${percentage}%`,
      opacity: 1,
      transition: {
        width: { duration: 1.2, ease: 'easeOut' },
        opacity: { duration: 0.5 },
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
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <motion.div
            className="w-full h-full rounded-full"
            style={{
              background: `conic-gradient(${languages
                .map((lang, index) => {
                  const color = languageColors[lang.name] || '#8b5cf6'
                  const startAngle = languages.slice(0, index).reduce((sum, l) => sum + (l.percentage / 100) * 360, 0)
                  const endAngle = startAngle + (lang.percentage / 100) * 360
                  return `${color} ${startAngle}deg ${endAngle}deg`
                })
                .join(', ')})`
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Languages</h2>
              <p className="text-gray-400">Your tech stack in {year}</p>
            </div>
          </div>

          {/* Top language highlight */}
          {topLanguage && (
            <div className="flex items-center space-x-2 mb-4">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-gray-300">
                Most used: <span className="font-bold text-white">{topLanguage}</span>
              </span>
            </div>
          )}
        </motion.div>

        {/* Languages list */}
        <motion.div
          variants={containerVariants}
          className="relative z-10 space-y-4"
        >
          {languages.map((language, index) => (
            <motion.div
              key={language.name}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: languageColors[language.name] || '#8b5cf6' }}
                  />
                  <span className="font-medium text-white">{language.name}</span>
                </div>
                <span className="text-sm text-gray-400">
                  {language.percentage.toFixed(1)}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ backgroundColor: languageColors[language.name] || '#8b5cf6' }}
                  custom={language.percentage}
                  variants={barVariants}
                />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    duration: 2,
                    delay: 1 + index * 0.1,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Fun fact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="relative z-10 mt-8 text-center"
        >
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <Palette className="w-4 h-4" />
            <span className="text-sm">
              {languages.length} languages mastered in {year}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}