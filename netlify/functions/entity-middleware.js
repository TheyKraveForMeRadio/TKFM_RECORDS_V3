import { supabase } from './supabase.js';

export async function loadEntity(event) {

  const slug = event.headers['x-entity-slug'];

  if (!slug) {
    throw new Error("Missing x-entity-slug header");
  }

  const { data: entity } = await supabase
    .from('treasury_entities')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!entity) {
    throw new Error("Invalid entity slug");
  }

  return entity;
}
