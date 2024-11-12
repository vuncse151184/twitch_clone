import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createClient } from '@/app/utils/supabase/client'
export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
  console.log('WEBHOOK_SECRET:==============================', WEBHOOK_SECRET);
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data
  const eventType = evt.type
  const supabase = createClient()
  if (eventType === 'user.created') {
    console.log("Creating user in supabase", payload.data.bio);
    const { data, error } = await supabase.from('user').insert({
      user_name: payload.data.username,
      image_url: payload.data.image_url,
      external_user_id: payload.data.id,
      bio: payload.data.bio,
    }).select()
    if (error) {
      console.error("Error inserting user:", error);
    } else {
      console.log("Successfully inserted user:", data);
    }
  }


  if (eventType === 'user.updated') {
    console.log("Creating user in supabase", payload.data.bio);
    const { data, error } = await supabase.from('user').update({
      user_name: payload.data.username,
      image_url: payload.data.image_url,
      bio: payload.data.bio,
    }).eq("external_user_id", payload.data.id).select()
    if (error) {
      console.error("Error updating user:", error);
    } else {
      console.log("Successfully updating user:", data);
    }
  }

  if (eventType === 'user.deleted') {
    const { error } = await supabase.from('user').delete().eq("external_user_id", payload.data.id)
    if (error) {
      return new Response('User not found', { status: 404 });
    }
    return new Response('', { status: 200 });
  }

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
  return new Response('', { status: 200 })
}