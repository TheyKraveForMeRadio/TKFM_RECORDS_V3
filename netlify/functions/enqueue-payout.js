import { supabase } from './supabase.js';

export async function handler() {

  const { data: artists } = await supabase
    .from('artist_balances')
    .select('*')
    .gt('available_balance', 100);

  for(const artist of artists || []) {
    await supabase.from('payout_queue').insert({
      artist_id: artist.id,
      amount: artist.available_balance,
      status: 'queued',
      created_at: new Date().toISOString()
    });
  }

  return {
    statusCode:200,
    body:JSON.stringify({ queued: artists?.length || 0 })
  };
}
