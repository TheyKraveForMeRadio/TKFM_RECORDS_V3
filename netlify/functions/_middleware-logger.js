import { supabase } from './supabase.js';

export async function logRequest(event, statusCode) {

  try {
    await supabase.from('request_logs').insert({
      path: event.path,
      method: event.httpMethod,
      ip: event.headers['x-forwarded-for'] || null,
      status_code: statusCode,
      created_at: new Date().toISOString()
    });
  } catch(e) {
    console.error("Logging failed");
  }
}
