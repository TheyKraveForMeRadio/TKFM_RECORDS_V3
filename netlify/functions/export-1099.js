import { supabase } from './supabase.js';

export async function handler(event) {

  const { year } = event.queryStringParameters;

  const { data: payouts } = await supabase
    .from('payout_line_items')
    .select('*')
    .gte('created_at', `${year}-01-01`)
    .lte('created_at', `${year}-12-31`);

  const grouped = {};

  for (const p of payouts || []) {
    if (!grouped[p.artist_email]) grouped[p.artist_email] = 0;
    grouped[p.artist_email] += Number(p.amount);
  }

  let csv = "Recipient,Total Paid\n";

  for (const email in grouped) {
    csv += `${email},${grouped[email]}\n`;
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="TKFM_1099_${year}.csv"`
    },
    body: csv
  };
}
