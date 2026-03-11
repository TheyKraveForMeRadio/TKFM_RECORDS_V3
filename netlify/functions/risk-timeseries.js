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
      .from('risk_score_history')
      .select('risk_score, created_at')
      .eq('entity_id', entity_id)
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
