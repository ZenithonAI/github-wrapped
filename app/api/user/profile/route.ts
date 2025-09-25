import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { GitHubClient } from '@/lib/github'

export async function GET(request: NextRequest) {
  try {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user from database
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!user) {
      // User doesn't exist in our database, create them
      const githubClient = new GitHubClient(session.provider_token || undefined)
      const githubUser = await githubClient.getUser(session.user.user_metadata.user_name)

      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({
          id: session.user.id,
          github_id: githubUser.id,
          username: githubUser.login,
          email: githubUser.email,
          avatar_url: githubUser.avatar_url,
          name: githubUser.name,
          bio: githubUser.bio,
          company: githubUser.company,
          location: githubUser.location,
          blog: githubUser.blog,
          twitter_username: githubUser.twitter_username,
          public_repos: githubUser.public_repos,
          followers: githubUser.followers,
          following: githubUser.following,
        })
        .select()
        .single()

      if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 })
      }

      return NextResponse.json({ user: newUser })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Profile error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const allowedFields = ['name', 'bio', 'company', 'location', 'blog', 'twitter_username']
    const updates = Object.keys(body)
      .filter(key => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = body[key]
        return obj
      }, {} as any)

    const { data: user, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', session.user.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}