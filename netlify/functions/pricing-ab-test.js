import { supabase } from './supabase.js';

export async function handler() {

  const { data } = await supabase
    .from('ab_pricing')
    .select('*');

  let A = 0, B = 0;

  data?.forEach(d => {
    if(d.variant === 'A') A += d.conversions;
    if(d.variant === 'B') B += d.conversions;
  });

  const winner = A > B ? "Variant A" : "Variant B";

  return {
    statusCode:200,
    body:JSON.stringify({
      variantA:A,
      variantB:B,
      winner
    })
  };
}
