import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import WrappedExperience from '@/components/wrapped/wrapped-experience'
import WrappedLoading from '@/components/wrapped/wrapped-loading'

interface WrappedPageProps {
  params: {
    username: string
  }
  searchParams: {
    year?: string
  }
}

export default function WrappedPage({ params, searchParams }: WrappedPageProps) {
  const { username } = params
  const year = searchParams.year ? parseInt(searchParams.year) : new Date().getFullYear()

  // Validate username format
  if (!username || username.length < 1 || username.includes(' ')) {
    notFound()
  }

  return (
    <div className="min-h-screen gradient-background">
      <Suspense fallback={<WrappedLoading username={username} />}>
        <WrappedExperience username={username} year={year} />
      </Suspense>
    </div>
  )
}

export async function generateMetadata({ params, searchParams }: WrappedPageProps) {
  const { username } = params
  const year = searchParams.year ? parseInt(searchParams.year) : new Date().getFullYear()

  return {
    title: `${username}'s GitHub Wrapped ${year} | GitHub Wrapped`,
    description: `Discover ${username}'s coding journey in ${year}. Beautiful visualizations of GitHub activity, contributions, and achievements.`,
    openGraph: {
      title: `${username}'s GitHub Wrapped ${year}`,
      description: `Check out ${username}'s amazing coding journey in ${year}!`,
      images: [`/api/og/wrapped/${username}?year=${year}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${username}'s GitHub Wrapped ${year}`,
      description: `Check out ${username}'s amazing coding journey in ${year}!`,
      images: [`/api/og/wrapped/${username}?year=${year}`],
    },
  }
}