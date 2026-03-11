import { supabase } from './supabase.js';

export async function handler() {

  const { data: events } = await supabase
    .from('security_events')
    .select('*')
    .gte('created_at',
      new Date(Date.now() - 24*60*60*1000).toISOString()
    );

  const highSeverity = (events || []).filter(
    e => e.severity === 'HIGH'
  );

  const alert = highSeverity.length > 5;

  return {
    statusCode: 200,
    body: JSON.stringify({
      events_last_24h: events?.length || 0,
      high_severity: highSeverity.length,
      alert_triggered: alert
    })
  };
}
