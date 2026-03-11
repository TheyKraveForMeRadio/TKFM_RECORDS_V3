import { supabase } from './supabase.js';

export async function handler() {

  const { data: deals } = await supabase
    .from('sales_pipeline')
    .select('*');

  let forecast = 0;

  const weights = {
    lead: 0.1,
    negotiation: 0.5,
    signed: 0.9
  };

  deals?.forEach(d => {
    const weight = weights[d.stage] || 0;
    forecast += (d.deal_value || 0) * weight;
  });

  return {
    statusCode:200,
    body:JSON.stringify({
      projectedRevenue: forecast
    })
  };
}
