'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks/use-auth'
import { useGitHubStats } from '@/hooks/use-github-stats'
import WrappedLoading from './wrapped-loading'
import CardCarousel from './card-carousel'
import WrappedHeader from './wrapped-header'
import ShareModal from './share-modal'
import { Button } from '@/components/ui/button'
import { Share2, Download, ArrowLeft } from 'lucide-react'

interface WrappedExperienceProps {
  username: string
  year: number
}

export default function WrappedExperience({ username, year }: WrappedExperienceProps) {
  const { user, signIn } = useAuth()
  const { stats, loading, error } = useGitHubStats(username, year)
  const [showShareModal, setShowShareModal] = useState(false)
  const [currentCard, setCurrentCard] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  // Check if user is viewing their own wrapped
  const isOwnWrapped = user?.user_metadata?.user_name === username

  useEffect(() => {
    // Auto-start the experience after loading completes
    if (!loading && stats && !hasStarted) {
      const timer = setTimeout(() => setHasStarted(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [loading, stats, hasStarted])

  // Show loading state
  if (loading || !hasStarted) {
    return <WrappedLoading username={username} />
  }

  // Handle errors
  if (error || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-12"
          >
            <div className="text-6xl mb-6">😅</div>
            <h2 className="text-3xl font-bold mb-4">
              Couldn't Generate Wrapped
            </h2>
            <p className="text-gray-400 mb-8">
              {error?.includes('Unauthorized')
                ? `We couldn't access ${username}'s GitHub data. They may need to sign in first.`
                : `We had trouble fetching ${username}'s GitHub activity. This could be due to privacy settings or the user not existing.`
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user && (
                <Button onClick={signIn} className="group">
                  Sign in with GitHub
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Button>
              )}

              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <WrappedHeader
        username={username}
        year={year}
        stats={stats}
        isOwnWrapped={isOwnWrapped}
      />

      {/* Main content */}
      <div className="relative z-10">
        <CardCarousel
          stats={stats}
          username={username}
          year={year}
          currentCard={currentCard}
          onCardChange={setCurrentCard}
        />
      </div>

      {/* Action bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="glass-card px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowShareModal(true)}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>

            {isOwnWrapped && (
              <Button
                variant="outline"
                size="sm"
                // onClick={handleDownload}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            )}

            <span className="text-sm text-gray-400">
              {currentCard + 1} / {12}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Share modal */}
      <AnimatePresence>
        {showShareModal && (
          <ShareModal
            username={username}
            year={year}
            currentCard={currentCard}
            onClose={() => setShowShareModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}