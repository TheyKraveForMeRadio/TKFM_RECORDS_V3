import { supabase } from './supabase.js';

export async function handler() {

  const { data: deals } = await supabase
    .from('sales_pipeline')
    .select('*');

  const scored = deals?.map(d => {

    let score = 0;

    if(d.deal_value > 10000) score += 30;
    if(d.stage === 'negotiation') score += 20;
    if(d.stage === 'signed') score += 40;
    if(d.days_in_pipeline < 30) score += 10;

    return {
      entity: d.entity_slug,
      stage: d.stage,
      score
    };
  });

  return {
    statusCode:200,
    body:JSON.stringify(scored)
  };
}
