'use client'

import Link from 'next/link'
import { Github, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-gradient">GitHub Wrapped</h3>
            <p className="text-gray-400 mt-1">Your coding journey, beautifully visualized</p>
          </div>

          <div className="flex items-center space-x-6">
            <Link
              href="https://github.com/codebyaaron"
              target="_blank"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://twitter.com/CodeByAaron"
              target="_blank"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            Built by{' '}
            <Link href="https://twitter.com/CodeByAaron" className="text-primary-400 hover:text-primary-300">
              @CodeByAaron
            </Link>{' '}
            (The Vibe Coder) • Built with Cursor & Claude Code in 5 nights
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-gray-300">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gray-300">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}