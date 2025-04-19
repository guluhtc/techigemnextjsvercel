import { NextResponse } from 'next/server'
import { verifyToken } from '@/lib/instagram/verify'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: 'Token required' }, { status: 400 })
    }

    // Get current user session
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get('sb-access-token')?.value

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(sessionCookie)

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
    }

    // Verify the token
    const result = await verifyToken(user.id, token)

    if (!result.isValid) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}