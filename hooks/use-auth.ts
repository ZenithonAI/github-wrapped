'use client'

import { useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
  })

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState({
        user: session?.user ?? null,
        session: session,
        loading: false,
      })
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setState({
        user: session?.user ?? null,
        session: session,
        loading: false,
      })
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async () => {
    try {
      const response = await fetch('/api/auth/github', {
        method: 'POST',
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Sign in error:', error)
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return {
    ...state,
    signIn,
    signOut,
  }
}