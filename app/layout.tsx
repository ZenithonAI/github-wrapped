import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GitHub Wrapped - Your 2025 coding journey, beautifully visualized',
  description: 'Transform your GitHub activity into stunning, shareable cards. See your coding personality, night owl score, language breakdown, and more.',
  keywords: 'github, wrapped, coding, developer, statistics, year in review',
  authors: [{ name: 'The Vibe Coder', url: 'https://github.com/codebyaaron' }],
  openGraph: {
    title: 'GitHub Wrapped - Your 2025 coding journey, beautifully visualized',
    description: 'Transform your GitHub activity into stunning, shareable cards.',
    url: 'https://githubwrapped.com',
    siteName: 'GitHub Wrapped',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitHub Wrapped - Your 2025 coding journey, beautifully visualized',
    description: 'Transform your GitHub activity into stunning, shareable cards.',
    creator: '@CodeByAaron',
  },
  robots: 'index, follow',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}