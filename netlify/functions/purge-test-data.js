import { supabase } from './supabase.js';

export async function handler() {

  if (process.env.NODE_ENV === 'production' && process.env.DEBUG_MODE === 'true') {
    return { statusCode:403, body:"Debug disabled in production" };
  }

  if(process.env.NODE_ENV !== 'development') {
    return { statusCode:403, body:"Not allowed outside development" };
  }

  await supabase.from('revenue_events')
    .delete()
    .ilike('source','%test%');

  await supabase.from('entities')
    .delete()
    .ilike('entity_slug','%test%');

  return {
    statusCode:200,
    body:"Test data purged"
  };
}
