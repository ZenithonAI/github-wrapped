import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service key for admin operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)