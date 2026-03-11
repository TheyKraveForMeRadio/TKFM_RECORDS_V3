import { supabase } from './supabase.js';

export async function handler() {

  const { data: balances } = await supabase
    .from('artist_balances')
    .select('*');

  for (const artist of balances || []) {

    if (Number(artist.available_balance) > 50000) {

      await supabase.from('fraud_alerts').insert({
        alert_type: 'Unusual balance surge',
        artist_email: artist.email,
        severity: 'HIGH',
        details: 'Balance exceeded 50k threshold'
      });

      await supabase.from('security_events').insert({
        event_type: 'FRAUD_ALERT',
        severity: 'HIGH',
        actor: artist.email,
        metadata: { balance: artist.available_balance }
      });

    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ status: "Fraud scan complete" })
  };
}
