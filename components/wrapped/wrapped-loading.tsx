'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Github, Code, GitBranch, Star, Users, Calendar } from 'lucide-react'

interface WrappedLoadingProps {
  username: string
}

const loadingSteps = [
  { icon: Github, text: 'Connecting to GitHub...', description: 'Authenticating with GitHub API' },
  { icon: Code, text: 'Analyzing commits...', description: 'Processing your coding activity' },
  { icon: GitBranch, text: 'Reviewing repositories...', description: 'Examining your projects' },
  { icon: Star, text: 'Counting contributions...', description: 'Calculating your impact' },
  { icon: Users, text: 'Generating insights...', description: 'Creating AI-powered analysis' },
  { icon: Calendar, text: 'Creating your wrapped...', description: 'Building beautiful cards' },
]

export default function WrappedLoading({ username }: WrappedLoadingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, 8000) // 8 seconds per step

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          return prev + 1
        }
        return prev
      })
    }, 500) // Progress updates every 500ms

    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
    }
  }, [])

  const currentStepData = loadingSteps[currentStep]
  const Icon = currentStepData.icon

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2],
            x: [0, -30, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary-400/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="max-w-2xl mx-auto text-center z-10 px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Creating <span className="text-gradient">{username}</span>'s
            <br />
            GitHub Wrapped
          </h1>
          <p className="text-gray-400 text-lg">
            Hold tight while we analyze your coding journey and create something amazing...
          </p>
        </motion.div>

        {/* Current step indicator */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              className="relative"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                <Icon className="w-8 h-8 text-white" />
              </div>
            </motion.div>
          </div>

          <h3 className="text-2xl font-bold mb-2">{currentStepData.text}</h3>
          <p className="text-gray-400">{currentStepData.description}</p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.min(progress, 100)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Steps indicator */}
        <div className="flex justify-center space-x-3">
          {loadingSteps.map((step, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index <= currentStep
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500'
                  : 'bg-gray-700'
              }`}
              animate={index === currentStep ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            />
          ))}
        </div>

        {/* Fun facts while loading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-12 text-sm text-gray-500"
        >
          💡 Did you know? The average developer makes over 1,000 commits per year!
        </motion.div>
      </div>
    </div>
  )
}