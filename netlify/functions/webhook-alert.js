import { supabase } from './supabase.js';

export async function handler() {

  const { data } = await supabase
    .from('stripe_webhook_events')
    .select('*')
    .gt('received_at', new Date(Date.now()-3600000).toISOString());

  if(data.length < 1) {
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        text:"⚠ No Stripe webhooks received in last hour."
      })
    });
  }

  return { statusCode:200 };
}
