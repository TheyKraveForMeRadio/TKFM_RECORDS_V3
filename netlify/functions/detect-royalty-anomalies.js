import { supabase } from './supabase.js';

export async function handler() {

  const { data: royalties } = await supabase
    .from('payout_line_items')
    .select('*');

  const grouped = {};

  for (const r of royalties || []) {
    if (!grouped[r.artist_email]) grouped[r.artist_email] = [];
    grouped[r.artist_email].push(Number(r.amount));
  }

  for (const artist in grouped) {

    const amounts = grouped[artist];
    const avg = amounts.reduce((a,b)=>a+b,0) / amounts.length;

    for (const amount of amounts) {

      if (amount > avg * 3) {

        await supabase.from('royalty_anomalies').insert({
          artist_email: artist,
          detected_issue: 'Revenue spike anomaly',
          severity: 'HIGH',
          reference_id: null
        });

      }

    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ status: "Scan complete" })
  };
}
