import { supabase } from './supabase.js';

export async function handler() {

  const { data } = await supabase
    .from('revenue_events')
    .select('*');

  const attribution = {};

  data?.forEach(event => {
    const source = event.source || 'unknown';
    attribution[source] = (attribution[source] || 0) + event.amount;
  });

  return {
    statusCode:200,
    body:JSON.stringify(attribution)
  };
}
