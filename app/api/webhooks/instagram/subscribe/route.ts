import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { access_token, verify_token } = await request.json()

    if (!access_token || !verify_token) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
    }

    // Subscribe to Instagram webhooks
    const response = await fetch(
      'https://graph.facebook.com/v12.0/instagram/subscriptions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          object: 'instagram',
          callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/instagram`,
          verify_token: verify_token,
          fields: ['mentions', 'story_insights', 'media_insights'],
          access_token: access_token,
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Webhook subscription failed: ${error}`)
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}