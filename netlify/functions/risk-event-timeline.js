import { supabase } from './supabase.js';

export async function handler(event) {

  try {

    const entity_id = event.queryStringParameters?.entity_id;

    if (!entity_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "entity_id required" })
      };
    }

    const { data, error } = await supabase
      .from('security_events')
      .select('event_type, created_at')
      .eq('actor', entity_id)
      .in('event_type', [
        'AUTO_PAYOUT_FREEZE',
        'AUTO_PAYOUT_UNFREEZE',
        'MANUAL_FREEZE',
        'MANUAL_UNFREEZE'
      ])
      .order('created_at', { ascending: true });

    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data || [])
    };

  } catch (err) {

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };

  }
}
