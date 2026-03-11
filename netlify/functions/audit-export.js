import { supabase } from './supabase.js';

export async function handler() {

  const tables = [
    'payout_batches',
    'payout_line_items',
    'tax_escrow',
    'platform_ledger',
    'artist_balances'
  ];

  const exportData = {};

  for (const table of tables) {
    const { data } = await supabase
      .from(table)
      .select('*');

    exportData[table] = data;
  }

  return {
    statusCode:200,
    body:JSON.stringify({
      exportedAt:new Date().toISOString(),
      data:exportData
    })
  };
}
