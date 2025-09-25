export interface User {
  id: string
  github_username: string
  github_id: number
  email?: string
  avatar_url: string
  created_at: string
  updated_at: string
  is_pro: boolean
  wrapped_generated_count: number
}

export interface GitHubStats {
  totalCommits: number
  totalPRs: number
  totalIssues: number
  totalStars: number
  totalRepos: number
  languages: LanguageStats[]
  contributionCalendar: ContributionDay[]
  longestStreak: number
  currentStreak: number
  mostProductiveDay: string
  mostProductiveHour: number
  nightOwlPercentage: number
  weekendPercentage: number
  personalityType: string
  funFacts: string[]
  yearOverview: {
    busyDays: number
    quietDays: number
    averageCommitsPerDay: number
    mostActiveMonth: string
    firstCommitDate: string
    lastCommitDate: string
  }
}

export interface WrappedStats {
  id: string
  user_id: string
  year: number
  data: GitHubStats
  generated_at: string
}

export interface LanguageStats {
  name: string
  percentage: number
  linesOfCode: number
  color: string
}

export interface ContributionDay {
  date: string
  contributionCount: number
  level: number
}

export interface Repository {
  name: string
  fullName: string
  description: string
  stars: number
  forks: number
  language: string
  url: string
  isPrivate: boolean
  createdAt: string
  updatedAt: string
}

export interface PersonalityType {
  id: string
  name: string
  description: string
  emoji: string
  characteristics: string[]
  motivation: string
}

export interface ShareData {
  platform: string
  cardType: string
  imageUrl: string
  text: string
}

export interface WaitlistEntry {
  id: string
  email: string
  created_at: string
  notified: boolean
}

export interface CardProps {
  data: GitHubStats
  username: string
  avatarUrl: string
  year: number
  isPro?: boolean
}

export type CardType =
  | 'overview'
  | 'night-owl'
  | 'language'
  | 'streak'
  | 'personality'
  | 'weekday-warrior'
  | 'repository-showcase'
  | 'pull-request'
  | 'year-progress'
  | 'code-poem'
  | 'achievements'
  | 'predictions'