import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Simulates central bank reserve adjustments
export async function handler(event) {
  const { adjustment, reason } = JSON.parse(event.body || '{}');

  const amount = Number(adjustment || 0);

  await sb.from('tkfm_treasury').insert({
    adjustment: amount,
    reason: reason || 'auto_adjustment',
    executed_by: 'WORLD_BANK_LAYER'
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      adjustment: amount
    })
  };
}
