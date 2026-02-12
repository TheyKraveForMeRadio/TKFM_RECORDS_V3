import { supabase } from './supabase.js';

export async function handler(event) {
  const email = event.queryStringParameters?.email;
  if (!email) {
    return { statusCode: 400, body: JSON.stringify({ active: false }) };
  }

  const { data, error } = await supabase
    .from('subscriptions')
    .select('status')
    .eq('email', email)
    .single();

  if (error || !data) {
    return { statusCode: 200, body: JSON.stringify({ active: false }) };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ active: data.status === 'active' })
  };
}
