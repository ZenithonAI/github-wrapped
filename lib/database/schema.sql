-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  github_id BIGINT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  email TEXT,
  avatar_url TEXT,
  name TEXT,
  bio TEXT,
  company TEXT,
  location TEXT,
  blog TEXT,
  twitter_username TEXT,
  public_repos INTEGER DEFAULT 0,
  followers INTEGER DEFAULT 0,
  following INTEGER DEFAULT 0,
  is_pro BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wrapped stats table
CREATE TABLE IF NOT EXISTS wrapped_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  total_commits INTEGER DEFAULT 0,
  total_repos INTEGER DEFAULT 0,
  total_stars_received INTEGER DEFAULT 0,
  total_forks INTEGER DEFAULT 0,
  total_prs INTEGER DEFAULT 0,
  total_issues INTEGER DEFAULT 0,
  most_used_languages JSONB DEFAULT '{}',
  contribution_calendar JSONB DEFAULT '{}',
  commit_times INTEGER[] DEFAULT ARRAY[]::INTEGER[],
  streak_data JSONB DEFAULT '{"current_streak": 0, "longest_streak": 0, "total_days": 0}',
  personality_traits TEXT[] DEFAULT ARRAY[]::TEXT[],
  ai_insights JSONB DEFAULT '{"personality_type": "", "coding_style": "", "fun_facts": [], "predictions": []}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, year)
);

-- Waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shares table
CREATE TABLE IF NOT EXISTS shares (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  card_type TEXT NOT NULL,
  platform TEXT NOT NULL,
  share_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_github_id ON users(github_id);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_wrapped_stats_user_year ON wrapped_stats(user_id, year);
CREATE INDEX IF NOT EXISTS idx_shares_user_id ON shares(user_id);
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Row Level Security policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE wrapped_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE shares ENABLE ROW LEVEL SECURITY;
-- Waitlist table should be accessible for inserts only

-- Users can read and update their own profile
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Users can view and manage their own wrapped stats
CREATE POLICY "Users can view own wrapped stats" ON wrapped_stats
  FOR SELECT USING (user_id::text = auth.uid()::text);

CREATE POLICY "Users can insert own wrapped stats" ON wrapped_stats
  FOR INSERT WITH CHECK (user_id::text = auth.uid()::text);

CREATE POLICY "Users can update own wrapped stats" ON wrapped_stats
  FOR UPDATE USING (user_id::text = auth.uid()::text);

-- Users can view and manage their own shares
CREATE POLICY "Users can view own shares" ON shares
  FOR SELECT USING (user_id::text = auth.uid()::text);

CREATE POLICY "Users can insert own shares" ON shares
  FOR INSERT WITH CHECK (user_id::text = auth.uid()::text);

-- Allow anonymous users to insert into waitlist
CREATE POLICY "Anyone can join waitlist" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_wrapped_stats_updated_at
  BEFORE UPDATE ON wrapped_stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();