import { supabase } from './supabase.js';

export async function loadEntity(event) {

  const slug = event.headers['x-entity-slug'];

  if (!slug) return null;

  const { data } = await supabase
    .from('entities')
    .select('*')
    .eq('slug', slug)
    .single();

  return data;
}
