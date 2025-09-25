'use client'

import { useState, useEffect } from 'react'
import useSWR from 'swr'

export interface GitHubStatsData {
  user_id: string
  year: number
  total_commits: number
  total_repos: number
  total_stars_received: number
  total_forks: number
  total_prs: number
  total_issues: number
  most_used_languages: Record<string, number>
  contribution_calendar: Record<string, number>
  commit_times: number[]
  streak_data: {
    current_streak: number
    longest_streak: number
    total_days: number
  }
  personality_traits: string[]
  ai_insights: {
    personality_type: string
    coding_style: string
    fun_facts: string[]
    predictions: string[]
    poem?: string
  }
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useGitHubStats(username?: string, year?: number) {
  const currentYear = new Date().getFullYear()
  const targetYear = year || currentYear

  const { data, error, isLoading, mutate } = useSWR(
    username ? `/api/github/stats?username=${username}&year=${targetYear}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // 1 minute
    }
  )

  const refetch = () => {
    mutate()
  }

  return {
    stats: data?.stats as GitHubStatsData | undefined,
    cached: data?.cached,
    cacheAge: data?.cacheAge,
    githubData: data?.githubData,
    loading: isLoading,
    error,
    refetch,
  }
}

export function useWaitlist() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const { data: countData } = useSWR('/api/waitlist', fetcher)

  const joinWaitlist = async (email: string, source = 'website') => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist')
      }

      setSuccess(true)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return {
    joinWaitlist,
    loading,
    error,
    success,
    count: countData?.count || 0,
  }
}