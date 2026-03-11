import { supabase } from './supabase.js';

export async function handler() {

  const oneHourAgo = new Date(Date.now() - 60*60*1000);

  const { data: events } = await supabase
    .from('stripe_webhook_events')
    .select('*')
    .gte('received_at', oneHourAgo.toISOString());

  const { data: logs } = await supabase
    .from('request_logs')
    .select('*')
    .gte('created_at', oneHourAgo.toISOString());

  const errors = logs.filter(l => l.status_code >= 400).length;

  const { data: anomalies } = await supabase
    .from('security_events')
    .select('*')
    .eq('event_type','WEBHOOK_ANOMALY')
    .gte('created_at', oneHourAgo.toISOString());

  return {
    statusCode:200,
    body: JSON.stringify({
      volume: events.length,
      errorRate: errors,
      anomalies: anomalies.length
    })
  };
}
