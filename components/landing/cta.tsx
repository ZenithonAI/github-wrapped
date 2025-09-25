'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Github, Mail, Rocket, Star, Users, Sparkles } from 'lucide-react'
import { useWaitlist } from '@/hooks/use-github-stats'
import { useAuth } from '@/hooks/use-auth'

export default function CTA() {
  const [email, setEmail] = useState('')
  const { signIn, user, loading: authLoading } = useAuth()
  const { joinWaitlist, loading: waitlistLoading, error: waitlistError, success: waitlistSuccess, count } = useWaitlist()
  const [userCount, setUserCount] = useState(2847)

  // Simulate growing user count (base count + waitlist count)
  useEffect(() => {
    const timer = setInterval(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 3) + 1)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      await joinWaitlist(email, 'cta-section')
    }
  }

  const handleGetWrapped = async () => {
    if (user) {
      // Redirect to wrapped generation
      window.location.href = `/wrapped/${user.user_metadata?.user_name || 'me'}`
    } else {
      await signIn()
    }
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.1, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Rocket className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium">Ready to launch</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Wrap Your{' '}
            <span className="text-gradient">2025 Story</span>?
          </h2>
          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
            Join thousands of developers who've already transformed their GitHub activity into stunning, shareable masterpieces.
            Your coding journey deserves to be celebrated.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="gradient"
                size="xl"
                className="group"
                onClick={handleGetWrapped}
                disabled={authLoading}
              >
                <Github className="w-6 h-6 mr-3" />
                {user ? 'Get Your GitHub Wrapped' : 'Sign in with GitHub'}
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </Button>
            </motion.div>

            <div className="text-sm text-gray-400 flex items-center space-x-4">
              <span>Free to start</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full" />
              <span>60 seconds</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full" />
              <span>No signup required</span>
            </div>
          </div>
        </motion.div>

        {/* Email Signup Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card p-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Mail className="w-6 h-6 text-primary-400" />
              <h3 className="text-2xl font-bold">Stay Updated</h3>
            </div>

            <p className="text-gray-300 mb-6">
              Get notified about new features, themes, and updates. Plus early access to premium features!
            </p>

            {!waitlistSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 flex-1"
                    required
                    disabled={waitlistLoading}
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    className="whitespace-nowrap"
                    disabled={waitlistLoading || !email}
                  >
                    {waitlistLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        ⚡
                      </motion.div>
                    ) : (
                      'Notify Me'
                    )}
                  </Button>
                </div>
                {waitlistError && (
                  <p className="text-red-400 text-sm">{waitlistError}</p>
                )}
                <p className="text-xs text-gray-500">
                  No spam, unsubscribe at any time. We respect your privacy.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-4"
              >
                <div className="text-6xl">🎉</div>
                <div>
                  <p className="text-green-400 font-semibold text-lg">You're on the list!</p>
                  <p className="text-gray-300">We'll notify you when new features launch.</p>
                </div>
                <div className="flex justify-center space-x-6 text-sm text-gray-400">
                  <span>📧 Updates delivered</span>
                  <span>🎁 Early access included</span>
                  <span>🚫 No spam ever</span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-primary-400" />
              <span>{(userCount + count).toLocaleString()}+ developers joined</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>4.9/5 user rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>12M+ GitHub commits analyzed</span>
            </div>
          </div>

          {/* Final encouragement */}
          <motion.p
            className="text-gray-300 mt-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            viewport={{ once: true }}
          >
            Your coding journey is unique. Let's make it beautiful. ✨
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}