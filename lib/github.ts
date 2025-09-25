import { Octokit } from '@octokit/rest'
import { supabaseAdmin } from './supabase'

export interface GitHubUser {
  id: number
  login: string
  name: string | null
  email: string | null
  avatar_url: string
  bio: string | null
  company: string | null
  location: string | null
  blog: string | null
  twitter_username: string | null
  public_repos: number
  followers: number
  following: number
}

export interface RepositoryStats {
  name: string
  language: string | null
  stars: number
  forks: number
  size: number
  created_at: string
  updated_at: string
  is_fork: boolean
}

export interface GitHubStats {
  user: GitHubUser
  repositories: RepositoryStats[]
  totalCommits: number
  contributionCalendar: Record<string, number>
  languageStats: Record<string, number>
  commitTimes: number[]
  pullRequests: number
  issues: number
}

export class GitHubClient {
  private octokit: Octokit

  constructor(accessToken?: string) {
    this.octokit = new Octokit({
      auth: accessToken,
    })
  }

  async getUser(username: string): Promise<GitHubUser> {
    try {
      const { data } = await this.octokit.rest.users.getByUsername({
        username,
      })

      return {
        id: data.id,
        login: data.login,
        name: data.name,
        email: data.email,
        avatar_url: data.avatar_url,
        bio: data.bio,
        company: data.company,
        location: data.location,
        blog: data.blog,
        twitter_username: data.twitter_username,
        public_repos: data.public_repos,
        followers: data.followers,
        following: data.following,
      }
    } catch (error) {
      console.error('Error fetching GitHub user:', error)
      throw new Error(`Failed to fetch user: ${username}`)
    }
  }

  async getUserRepositories(username: string, year?: number): Promise<RepositoryStats[]> {
    try {
      const repositories: RepositoryStats[] = []
      let page = 1
      let hasMore = true

      while (hasMore) {
        const { data } = await this.octokit.rest.repos.listForUser({
          username,
          per_page: 100,
          page,
          sort: 'updated',
          direction: 'desc',
        })

        if (data.length === 0) {
          hasMore = false
          break
        }

        const filteredRepos = data
          .filter(repo => {
            if (!year) return true
            const repoYear = new Date(repo.created_at).getFullYear()
            return repoYear === year
          })
          .map(repo => ({
            name: repo.name,
            language: repo.language,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            size: repo.size,
            created_at: repo.created_at,
            updated_at: repo.updated_at,
            is_fork: repo.fork,
          }))

        repositories.push(...filteredRepos)
        page++

        // Respect rate limits
        if (data.length < 100) {
          hasMore = false
        }
      }

      return repositories
    } catch (error) {
      console.error('Error fetching repositories:', error)
      throw new Error(`Failed to fetch repositories for: ${username}`)
    }
  }

  async getContributionStats(username: string, year: number): Promise<{
    totalCommits: number
    contributionCalendar: Record<string, number>
    commitTimes: number[]
  }> {
    try {
      // This would use GitHub GraphQL API for contribution calendar
      // For now, we'll use a simplified approach
      const query = `
        query($username: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $username) {
            contributionsCollection(from: $from, to: $to) {
              totalCommitContributions
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `

      const fromDate = new Date(year, 0, 1).toISOString()
      const toDate = new Date(year, 11, 31, 23, 59, 59).toISOString()

      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.octokit.auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: {
            username,
            from: fromDate,
            to: toDate,
          },
        }),
      })

      const data = await response.json()

      if (data.errors) {
        throw new Error(`GraphQL Error: ${data.errors[0].message}`)
      }

      const contributionsData = data.data.user.contributionsCollection
      const calendar: Record<string, number> = {}

      // Process contribution calendar
      contributionsData.contributionCalendar.weeks.forEach((week: any) => {
        week.contributionDays.forEach((day: any) => {
          calendar[day.date] = day.contributionCount
        })
      })

      return {
        totalCommits: contributionsData.totalCommitContributions,
        contributionCalendar: calendar,
        commitTimes: [], // Would need to fetch individual commits for timing data
      }
    } catch (error) {
      console.error('Error fetching contribution stats:', error)
      // Return fallback data
      return {
        totalCommits: 0,
        contributionCalendar: {},
        commitTimes: [],
      }
    }
  }

  async getLanguageStats(repositories: RepositoryStats[]): Promise<Record<string, number>> {
    const languageStats: Record<string, number> = {}

    repositories.forEach(repo => {
      if (repo.language && !repo.is_fork) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + repo.size
      }
    })

    return languageStats
  }

  async getPullRequestCount(username: string, year: number): Promise<number> {
    try {
      const query = `author:${username} type:pr created:${year}-01-01..${year}-12-31`

      const { data } = await this.octokit.rest.search.issuesAndPullRequests({
        q: query,
        per_page: 1,
      })

      return data.total_count
    } catch (error) {
      console.error('Error fetching PR count:', error)
      return 0
    }
  }

  async getIssueCount(username: string, year: number): Promise<number> {
    try {
      const query = `author:${username} type:issue created:${year}-01-01..${year}-12-31`

      const { data } = await this.octokit.rest.search.issuesAndPullRequests({
        q: query,
        per_page: 1,
      })

      return data.total_count
    } catch (error) {
      console.error('Error fetching issue count:', error)
      return 0
    }
  }

  async getComprehensiveStats(username: string, year: number = new Date().getFullYear()): Promise<GitHubStats> {
    try {
      // Check cache first
      const cached = await this.getCachedStats(username, year)
      if (cached && this.isCacheValid(cached.updated_at)) {
        return this.transformCachedStats(cached)
      }

      const user = await this.getUser(username)
      const repositories = await this.getUserRepositories(username, year)
      const contributionStats = await this.getContributionStats(username, year)
      const languageStats = await this.getLanguageStats(repositories)
      const pullRequests = await this.getPullRequestCount(username, year)
      const issues = await this.getIssueCount(username, year)

      const stats: GitHubStats = {
        user,
        repositories,
        totalCommits: contributionStats.totalCommits,
        contributionCalendar: contributionStats.contributionCalendar,
        languageStats,
        commitTimes: contributionStats.commitTimes,
        pullRequests,
        issues,
      }

      // Cache the results
      await this.cacheStats(username, year, stats)

      return stats
    } catch (error) {
      console.error('Error fetching comprehensive GitHub stats:', error)
      throw error
    }
  }

  private async getCachedStats(username: string, year: number) {
    try {
      const { data } = await supabaseAdmin
        .from('wrapped_stats')
        .select('*')
        .eq('user_id', username) // This would need proper user ID mapping
        .eq('year', year)
        .single()

      return data
    } catch (error) {
      return null
    }
  }

  private isCacheValid(updatedAt: string): boolean {
    const cacheAge = Date.now() - new Date(updatedAt).getTime()
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours
    return cacheAge < maxAge
  }

  private transformCachedStats(cached: any): GitHubStats {
    // Transform cached data back to GitHubStats format
    return {
      user: {} as GitHubUser, // Would need to reconstruct from cached data
      repositories: [],
      totalCommits: cached.total_commits,
      contributionCalendar: cached.contribution_calendar,
      languageStats: cached.most_used_languages,
      commitTimes: cached.commit_times,
      pullRequests: cached.total_prs,
      issues: cached.total_issues,
    }
  }

  private async cacheStats(username: string, year: number, stats: GitHubStats) {
    try {
      await supabaseAdmin
        .from('wrapped_stats')
        .upsert({
          user_id: username, // This would need proper user ID mapping
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
        })
    } catch (error) {
      console.error('Error caching stats:', error)
    }
  }
}