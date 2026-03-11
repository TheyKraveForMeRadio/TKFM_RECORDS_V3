import { supabase } from './supabase.js';

export async function handler() {

  const { data: recent } = await supabase
    .from('revenue_events')
    .select('*')
    .gte('created_at',
      new Date(Date.now() - 24*60*60*1000).toISOString());

  let fraudFlags = [];

  for (let event of recent) {

    if (event.amount > 50000) {
      fraudFlags.push({
        type: 'LARGE_PAYMENT',
        entity_id: event.entity_id,
        amount: event.amount
      });
    }
  }

  for (let flag of fraudFlags) {
    await supabase.from('security_events').insert({
      event_type: 'FINANCIAL_FRAUD',
      severity: 'HIGH',
      metadata: flag
    });
  }

  return {
    statusCode:200,
    body: JSON.stringify({ fraudFlags })
  };
}
