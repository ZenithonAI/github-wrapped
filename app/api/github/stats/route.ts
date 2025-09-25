import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { GitHubClient } from '@/lib/github'

export async function GET(request: NextRequest) {
  try {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString())
    const username = searchParams.get('username') || session.user.user_metadata.user_name

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 })
    }

    // Check if we have cached data
    const { data: cachedStats } = await supabase
      .from('wrapped_stats')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('year', year)
      .single()

    // If cache is fresh (less than 24 hours), return it
    if (cachedStats) {
      const cacheAge = Date.now() - new Date(cachedStats.updated_at).getTime()
      const maxAge = 24 * 60 * 60 * 1000 // 24 hours

      if (cacheAge < maxAge) {
        return NextResponse.json({
          stats: cachedStats,
          cached: true,
          cacheAge: Math.floor(cacheAge / 1000 / 60) // minutes
        })
      }
    }

    // Fetch fresh data from GitHub
    const githubClient = new GitHubClient(session.provider_token)
    const stats = await githubClient.getComprehensiveStats(username, year)

    // Calculate additional metrics
    const streakData = calculateStreakData(stats.contributionCalendar)
    const personalityTraits = generatePersonalityTraits(stats)

    // Save to database
    const wrappedData = {
      user_id: session.user.id,
      year,
      total_commits: stats.totalCommits,
      total_repos: stats.repositories.length,
      total_stars_received: stats.repositories.reduce((sum, repo) => sum + repo.stars, 0),
      total_forks: stats.repositories.reduce((sum, repo) => sum + repo.forks, 0),
      total_prs: stats.pullRequests,
      total_issues: stats.issues,
      most_used_languages: stats.languageStats,
      contribution_calendar: stats.contributionCalendar,
      commit_times: stats.commitTimes,
      streak_data: streakData,
      personality_traits: personalityTraits,
      ai_insights: {
        personality_type: '',
        coding_style: '',
        fun_facts: [],
        predictions: []
      }
    }

    const { data: savedStats, error } = await supabase
      .from('wrapped_stats')
      .upsert(wrappedData)
      .select()
      .single()

    if (error) {
      console.error('Error saving stats:', error)
      // Still return the fetched data even if save fails
    }

    return NextResponse.json({
      stats: savedStats || wrappedData,
      cached: false,
      githubData: stats
    })
  } catch (error) {
    console.error('GitHub stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch GitHub stats' }, { status: 500 })
  }
}

function calculateStreakData(contributionCalendar: Record<string, number>) {
  const dates = Object.keys(contributionCalendar).sort()
  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 0
  let totalDays = 0

  const today = new Date().toISOString().split('T')[0]

  for (const date of dates) {
    const contributions = contributionCalendar[date]

    if (contributions > 0) {
      tempStreak++
      totalDays++
      longestStreak = Math.max(longestStreak, tempStreak)

      // Check if this contributes to current streak
      if (date <= today) {
        currentStreak = tempStreak
      }
    } else {
      tempStreak = 0
      // Reset current streak if we hit today or past today
      if (date >= today) {
        currentStreak = 0
      }
    }
  }

  return {
    current_streak: currentStreak,
    longest_streak: longestStreak,
    total_days: totalDays
  }
}

function generatePersonalityTraits(stats: any): string[] {
  const traits: string[] = []

  // Analyze coding patterns
  if (stats.totalCommits > 500) {
    traits.push('Prolific Contributor')
  }

  if (stats.repositories.length > 20) {
    traits.push('Project Creator')
  }

  const languages = Object.keys(stats.languageStats)
  if (languages.length > 5) {
    traits.push('Polyglot Developer')
  }

  if (stats.pullRequests > 100) {
    traits.push('Open Source Collaborator')
  }

  // Time-based analysis would need commit times data
  if (stats.commitTimes.length > 0) {
    const nightCommits = stats.commitTimes.filter(hour => hour >= 22 || hour <= 6).length
    const totalCommitTimes = stats.commitTimes.length

    if (nightCommits / totalCommitTimes > 0.3) {
      traits.push('Night Owl')
    }
  }

  return traits.slice(0, 5) // Limit to 5 traits
}