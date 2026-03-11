import { supabase } from './supabase.js';

export async function handler() {

  const issues = [];

  const { data: entities } = await supabase.from('entities').select('*');

  entities?.forEach(e=>{
    if(!e.stripe_customer_id)
      issues.push({ entity:e.entity_slug, issue:"Missing Stripe ID" });

    if(!e.subscription_status)
      issues.push({ entity:e.entity_slug, issue:"Missing subscription status" });
  });

  return {
    statusCode:200,
    body:JSON.stringify({
      integrityScore: issues.length === 0 ? "Healthy" : "Issues Found",
      issues
    })
  };
}
