import { supabase } from './supabase.js';

export async function handler() {

  const { data } = await supabase
    .from('partner_referrals')
    .select('*');

  const partners = {};

  data?.forEach(p => {

    if(!partners[p.partner]) {
      partners[p.partner] = {
        deals:0,
        revenue:0
      };
    }

    partners[p.partner].deals++;
    partners[p.partner].revenue += p.deal_value || 0;
  });

  return {
    statusCode:200,
    body:JSON.stringify(partners)
  };
}
