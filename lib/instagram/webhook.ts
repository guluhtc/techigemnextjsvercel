import { instagramConfig } from './config'

const GRAPH_API_URL = `${instagramConfig.graphApiPublishUrl}/${instagramConfig.apiVersion}`
const ACCESS_TOKEN = instagramConfig.accessToken
const WEBHOOK_URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/instagram`

export async function subscribe(fields: string[]) {
  try {
    const response = await fetch(
      `${GRAPH_API_URL}/instagram/subscriptions`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_token: ACCESS_TOKEN,
          callback_url: WEBHOOK_URL,
          fields: fields.join(','),
          verify_token: process.env.WEBHOOK_VERIFY_TOKEN,
          object: 'instagram',
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Failed to subscribe to webhook')
    }

    return await response.json()
  } catch (error) {
    console.error('Error subscribing to webhook:', error)
    throw new Error('Failed to subscribe to webhook')
  }
}

export async function listSubscriptions() {
  try {
    const response = await fetch(
      `${GRAPH_API_URL}/instagram/subscriptions?access_token=${ACCESS_TOKEN}`
    )

    if (!response.ok) {
      throw new Error('Failed to list subscriptions')
    }

    return await response.json()
  } catch (error) {
    console.error('Error listing subscriptions:', error)
    throw new Error('Failed to list subscriptions')
  }
}

export async function deleteSubscription(subscriptionId: string) {
  try {
    const response = await fetch(
      `${GRAPH_API_URL}/instagram/subscriptions`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_token: ACCESS_TOKEN,
          object: 'instagram',
          subscription_id: subscriptionId,
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Failed to delete subscription')
    }

    return await response.json()
  } catch (error) {
    console.error('Error deleting subscription:', error)
    throw new Error('Failed to delete subscription')
  }
}