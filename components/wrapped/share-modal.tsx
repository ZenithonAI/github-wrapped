'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X, Twitter, Linkedin, Copy, Check, Download } from 'lucide-react'

interface ShareModalProps {
  username: string
  year: number
  currentCard: number
  onClose: () => void
}

const shareOptions = [
  {
    name: 'Twitter',
    icon: Twitter,
    color: 'hover:bg-blue-500/20 hover:text-blue-400',
    action: (url: string, text: string) => {
      const tweetText = encodeURIComponent(`${text}\n\n${url}`)
      window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank')
    }
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'hover:bg-blue-600/20 hover:text-blue-300',
    action: (url: string, text: string) => {
      const linkedInUrl = encodeURIComponent(url)
      const summary = encodeURIComponent(text)
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${linkedInUrl}&summary=${summary}`, '_blank')
    }
  }
]

export default function ShareModal({ username, year, currentCard, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = `${window.location.origin}/wrapped/${username}?year=${year}`
  const shareText = `Check out ${username}'s GitHub Wrapped ${year}! 🎉`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const downloadImage = () => {
    // This would trigger the download of the current card as an image
    console.log('Download image for card:', currentCard)
    // Implementation would use html-to-image or similar
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="glass-card p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Share Wrapped</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <p className="text-gray-300 mb-8 text-center">
          Share {username === 'me' ? 'your' : `${username}'s`} amazing GitHub Wrapped {year} with the world!
        </p>

        {/* Social sharing options */}
        <div className="space-y-3 mb-8">
          {shareOptions.map((option) => {
            const Icon = option.icon
            return (
              <Button
                key={option.name}
                variant="ghost"
                className={`w-full justify-start p-4 h-auto ${option.color} transition-all duration-200`}
                onClick={() => option.action(shareUrl, shareText)}
              >
                <Icon className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Share on {option.name}</div>
                  <div className="text-sm text-gray-400">Post to your {option.name.toLowerCase()} feed</div>
                </div>
              </Button>
            )
          })}
        </div>

        {/* Copy link */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-white/5 border border-white/20 rounded-lg p-3 text-sm text-gray-300 truncate">
              {shareUrl}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="flex-shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>

          {/* Download option */}
          <Button
            variant="outline"
            className="w-full"
            onClick={downloadImage}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Current Card
          </Button>
        </div>

        {/* Footer note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Sharing helps support GitHub Wrapped development ❤️
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}