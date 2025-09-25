export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          github_id: number
          username: string
          email: string | null
          avatar_url: string | null
          name: string | null
          bio: string | null
          company: string | null
          location: string | null
          blog: string | null
          twitter_username: string | null
          public_repos: number
          followers: number
          following: number
          is_pro: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          github_id: number
          username: string
          email?: string | null
          avatar_url?: string | null
          name?: string | null
          bio?: string | null
          company?: string | null
          location?: string | null
          blog?: string | null
          twitter_username?: string | null
          public_repos?: number
          followers?: number
          following?: number
          is_pro?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          github_id?: number
          username?: string
          email?: string | null
          avatar_url?: string | null
          name?: string | null
          bio?: string | null
          company?: string | null
          location?: string | null
          blog?: string | null
          twitter_username?: string | null
          public_repos?: number
          followers?: number
          following?: number
          is_pro?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      wrapped_stats: {
        Row: {
          id: string
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
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          year: number
          total_commits?: number
          total_repos?: number
          total_stars_received?: number
          total_forks?: number
          total_prs?: number
          total_issues?: number
          most_used_languages?: Record<string, number>
          contribution_calendar?: Record<string, number>
          commit_times?: number[]
          streak_data?: {
            current_streak: number
            longest_streak: number
            total_days: number
          }
          personality_traits?: string[]
          ai_insights?: {
            personality_type: string
            coding_style: string
            fun_facts: string[]
            predictions: string[]
            poem?: string
          }
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          year?: number
          total_commits?: number
          total_repos?: number
          total_stars_received?: number
          total_forks?: number
          total_prs?: number
          total_issues?: number
          most_used_languages?: Record<string, number>
          contribution_calendar?: Record<string, number>
          commit_times?: number[]
          streak_data?: {
            current_streak: number
            longest_streak: number
            total_days: number
          }
          personality_traits?: string[]
          ai_insights?: {
            personality_type: string
            coding_style: string
            fun_facts: string[]
            predictions: string[]
            poem?: string
          }
          created_at?: string
          updated_at?: string
        }
      }
      waitlist: {
        Row: {
          id: string
          email: string
          source: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          source?: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          source?: string
          created_at?: string
        }
      }
      shares: {
        Row: {
          id: string
          user_id: string
          card_type: string
          platform: string
          share_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          card_type: string
          platform: string
          share_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          card_type?: string
          platform?: string
          share_url?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}