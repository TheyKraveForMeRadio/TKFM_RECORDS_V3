import { supabase } from './supabase.js';

export async function handler() {

  const { data } = await supabase
    .from('stripe_webhook_events')
    .select('*')
    .order('received_at', { ascending:false })
    .limit(50);

  return {
    statusCode:200,
    body:JSON.stringify(data)
  };
}
