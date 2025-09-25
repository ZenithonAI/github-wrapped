import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${request.nextUrl.origin}/api/auth/callback`,
        scopes: 'read:user user:email',
      },
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ url: data.url })
  } catch (error) {
    console.error('GitHub OAuth error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}