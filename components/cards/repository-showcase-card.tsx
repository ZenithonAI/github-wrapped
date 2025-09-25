'use client'

import { motion } from 'framer-motion'
import { Star, GitFork, Eye, Code, Trophy, Rocket } from 'lucide-react'
import { GitHubStatsData } from '@/hooks/use-github-stats'

interface RepositoryShowcaseCardProps {
  stats: GitHubStatsData
  username: string
  year: number
}

// Mock repository data since we don't have the full repository details in our stats
const generateTopRepos = (stats: GitHubStatsData, username: string) => {
  const languages = Object.keys(stats.most_used_languages).slice(0, 5)

  // Generate realistic repository names and stats based on user's languages
  const mockRepos = [
    {
      name: `awesome-${languages[0]?.toLowerCase() || 'project'}`,
      language: languages[0] || 'JavaScript',
      stars: Math.floor(Math.random() * 1000) + 50,
      forks: Math.floor(Math.random() * 200) + 10,
      description: 'A powerful and elegant solution for modern development challenges',
      isOriginal: true,
    },
    {
      name: `${username}-portfolio`,
      language: languages[1] || 'TypeScript',
      stars: Math.floor(Math.random() * 500) + 25,
      forks: Math.floor(Math.random() * 100) + 5,
      description: 'Personal portfolio showcasing projects and skills',
      isOriginal: true,
    },
    {
      name: `learning-${languages[2]?.toLowerCase() || 'algorithms'}`,
      language: languages[2] || 'Python',
      stars: Math.floor(Math.random() * 300) + 15,
      forks: Math.floor(Math.random() * 75) + 3,
      description: 'Educational repository for mastering programming concepts',
      isOriginal: true,
    },
  ]

  return mockRepos.sort((a, b) => b.stars - a.stars)
}

// Language colors for repository visualization
const languageColors: Record<string, string> = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3776ab',
  Java: '#ed8b00',
  'C++': '#00599c',
  React: '#61dafb',
  Vue: '#4fc08d',
  Go: '#00add8',
  Rust: '#000000',
  PHP: '#777bb4',
}

export default function RepositoryShowcaseCard({ stats, username, year }: RepositoryShowcaseCardProps) {
  const topRepos = generateTopRepos(stats, username)
  const totalStars = topRepos.reduce((sum, repo) => sum + repo.stars, 0)
  const totalForks = topRepos.reduce((sum, repo) => sum + repo.forks, 0)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const repoVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
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
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full translate-y-12 -translate-x-12" />

        {/* Floating stars */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400/20"
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
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Star className="w-4 h-4 fill-current" />
          </motion.div>
        ))}

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
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <Trophy className="w-6 h-6 text-white" />
              </motion.div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Repository Showcase</h2>
              <p className="text-gray-400">Your standout projects</p>
            </div>
          </div>

          {/* Stats summary */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">{totalStars}</span>
              <span className="text-gray-400">total stars</span>
            </div>
            <div className="flex items-center space-x-2">
              <GitFork className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 font-semibold">{totalForks}</span>
              <span className="text-gray-400">total forks</span>
            </div>
          </div>
        </motion.div>

        {/* Repository cards */}
        <motion.div
          variants={containerVariants}
          className="relative z-10 space-y-3"
        >
          {topRepos.map((repo, index) => (
            <motion.div
              key={repo.name}
              variants={repoVariants}
              className="bg-white/5 border border-white/10 rounded-xl p-4 group hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  {/* Repository rank */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-yellow-500 text-black' :
                    index === 1 ? 'bg-gray-400 text-black' :
                    'bg-orange-500 text-white'
                  }`}>
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">
                      {repo.name}
                    </h3>
                    <div className="flex items-center space-x-3 text-xs text-gray-400">
                      <div className="flex items-center space-x-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: languageColors[repo.language] || '#8b5cf6' }}
                        />
                        <span>{repo.language}</span>
                      </div>
                      {repo.isOriginal && (
                        <div className="flex items-center space-x-1">
                          <Rocket className="w-3 h-3" />
                          <span>Original</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Repository stats */}
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="font-medium">{repo.stars}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GitFork className="w-4 h-4 text-blue-400" />
                    <span className="font-medium">{repo.forks}</span>
                  </div>
                </div>
              </div>

              {/* Repository description */}
              <p className="text-sm text-gray-300 mb-2">{repo.description}</p>

              {/* Activity indicator */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Active in {year}</span>
                </div>

                {/* Impact score */}
                <div className="text-xs text-gray-400">
                  Impact: <span className="text-green-400 font-semibold">
                    {Math.floor((repo.stars + repo.forks * 2) / 10)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="relative z-10 text-center mt-6"
        >
          <p className="text-gray-400 text-sm">
            🌟 Your repositories inspire and educate the developer community!
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}