import { supabase } from './supabase.js';

export async function handler(event) {

  const payload = JSON.parse(event.body || "{}");

  if(payload.type === "invoice.paid") {

    await supabase.from('revenue_events').insert({
      event_id: payload.id,
      amount: payload.data?.object?.amount_paid/100,
      currency: payload.data?.object?.currency,
      created_at: new Date().toISOString()
    });
  }

  return {
    statusCode:200,
    body:JSON.stringify({received:true})
  };
}
