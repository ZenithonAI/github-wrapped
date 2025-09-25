export const SITE_CONFIG = {
  name: 'GitHub Wrapped',
  title: 'GitHub Wrapped - Your 2025 coding journey, beautifully visualized',
  description: 'Transform your GitHub activity into stunning, shareable cards. See your coding personality, night owl score, language breakdown, and more.',
  url: 'https://githubwrapped.com',
  ogImage: 'https://githubwrapped.com/og-image.jpg',
  creator: '@CodeByAaron',
  creatorName: 'The Vibe Coder',
}

export const CARD_DIMENSIONS = {
  width: 1200,
  height: 630,
}

export const PERSONALITY_TYPES = [
  {
    id: 'night-owl',
    name: 'The Night Owl',
    description: 'Thrives in the darkness, shipping code when the world sleeps',
    emoji: '🦉',
    criteria: 'nightOwlPercentage > 60'
  },
  {
    id: 'marathoner',
    name: 'The Marathoner',
    description: 'Consistent commitment streaks that would make athletes jealous',
    emoji: '🏃‍♂️',
    criteria: 'longestStreak > 100'
  },
  {
    id: 'sprinter',
    name: 'The Sprinter',
    description: 'Bursts of intense coding activity followed by strategic rest',
    emoji: '⚡',
    criteria: 'hasIntenseBursts'
  },
  {
    id: 'architect',
    name: 'The Architect',
    description: 'More planning than coding - the foundation builder',
    emoji: '🏗️',
    criteria: 'issueToCommitRatio > 0.5'
  },
  {
    id: 'collaborator',
    name: 'The Collaborator',
    description: 'Thrives on teamwork and code reviews',
    emoji: '🤝',
    criteria: 'pullRequestActivity > average'
  },
  {
    id: 'explorer',
    name: 'The Explorer',
    description: 'Always trying new languages and technologies',
    emoji: '🌍',
    criteria: 'languageCount > 5'
  }
]

export const GITHUB_LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  'C#': '#239120',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#ffac45',
  Kotlin: '#F18E33',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#1572B6',
  Shell: '#89e051',
  Vue: '#2c3e50',
  React: '#61dafb',
}

export const FREE_TIER_CARDS = [
  'overview',
  'night-owl',
  'language',
  'streak',
  'personality'
]

export const PRO_TIER_CARDS = [
  'weekday-warrior',
  'repository-showcase',
  'pull-request',
  'year-progress',
  'code-poem',
  'achievements',
  'predictions'
]

export const SOCIAL_PLATFORMS = [
  {
    id: 'twitter',
    name: 'Twitter',
    shareText: 'Check out my 2025 GitHub Wrapped! 🚀',
    hashtags: ['GitHubWrapped', 'CodingYear2025', 'Developer']
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    shareText: 'Reflecting on my 2025 coding journey with GitHub Wrapped. Here are my development highlights!'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    shareText: 'My coding year in beautiful cards ✨'
  }
]