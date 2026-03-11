import { supabase } from './supabase.js';

export async function handler() {

  const now = new Date();
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

  const { data, error } = await supabase
    .from('stripe_webhook_events')
    .select('id,event_type,received_at')
    .gte('received_at', fiveMinutesAgo.toISOString());

  if (error) {
    return { statusCode:500, body:error.message };
  }

  const count = data.length;

  const thresholdHigh = 500;   // spike threshold
  const thresholdLow = 0;      // drop threshold

  let anomaly = null;

  if (count > thresholdHigh) anomaly = "SPIKE";
  if (count <= thresholdLow) anomaly = "DROPOUT";

  if (anomaly) {
    await supabase.from('security_events').insert({
      event_type: 'WEBHOOK_ANOMALY',
      severity: 'HIGH',
      metadata: { count, anomaly }
    });
  }

  return {
    statusCode:200,
    body: JSON.stringify({ count, anomaly })
  };
}
