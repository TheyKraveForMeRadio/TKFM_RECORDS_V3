import fetch from 'node-fetch';
import { supabase } from './supabase.js';

export async function handler() {

  const { data: alerts } = await supabase
    .from('security_events')
    .select('*')
    .eq('severity','HIGH')
    .gte('created_at',
      new Date(Date.now()-5*60*1000).toISOString());

  for (let alert of alerts) {

    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        text:
          `🚨 SECURITY ALERT\nType: ${alert.event_type}\nData: ${JSON.stringify(alert.metadata)}`
      })
    });
  }

  return {
    statusCode:200,
    body: JSON.stringify({ alertsSent: alerts.length })
  };
}
