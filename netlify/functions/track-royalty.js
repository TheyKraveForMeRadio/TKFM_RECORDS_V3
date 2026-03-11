import { supabase } from './supabase.js';

export async function handler(event) {

  const { email, trackName, revenue } = JSON.parse(event.body);

  if (!email || !revenue) {
    return { statusCode: 400, body: "Missing fields" };
  }

  const artistShare = revenue * 0.8;
  const labelShare = revenue * 0.2;

  await supabase.from('artist_balances')
    .upsert({
      email,
      available_balance: artistShare,
      lifetime_earned: artistShare
    }, { onConflict: 'email', ignoreDuplicates: false });

  await supabase.from('royalty_ledger').insert({
    email,
    track_name: trackName,
    revenue,
    artist_share: artistShare,
    label_share: labelShare
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
}
