import { supabase } from './supabase.js';

export async function handler() {

  const { data: entities } = await supabase
    .from('entities')
    .select('*');

  const lendingMatrix = [];

  for (const lender of entities || []) {

    const { data: lenderBalances } = await supabase
      .from('artist_balances')
      .select('available_balance')
      .eq('entity_id', lender.id);

    const lenderLiquidity =
      (lenderBalances||[]).reduce((s,b)=>s+Number(b.available_balance||0),0);

    for (const borrower of entities || []) {

      if (lender.id === borrower.id) continue;

      const loanCapacity = lenderLiquidity * 0.2;

      lendingMatrix.push({
        lender:lender.slug,
        borrower:borrower.slug,
        maxLoan:loanCapacity
      });
    }
  }

  return {
    statusCode:200,
    body:JSON.stringify(lendingMatrix)
  };
}
