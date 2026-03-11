const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function processCatalog(catalog) {

  const { data: holders, error } = await supabase
    .from("token_holders")
    .select("*")
    .eq("catalog_id", catalog.catalog_id);

  if (error) throw error;

  let payouts = [];

  for (const holder of holders) {

    const share = holder.token_balance / catalog.total_tokens;
    const payout = catalog.total_revenue * share;

    payouts.push({
      catalog_id: catalog.catalog_id,
      holder_id: holder.holder_id,
      amount_usd: payout,
      created_at: new Date().toISOString()
    });

    await supabase
      .from("investor_balances")
      .upsert({
        investor_id: holder.holder_id,
        balance_usd: payout
      }, { onConflict: "investor_id" });

  }

  if (payouts.length > 0) {
    await supabase.from("royalty_payouts").insert(payouts);
  }

  return payouts.length;
}

exports.handler = async function () {

  try {

    const { data: catalogs, error } = await supabase
      .from("catalog_revenue_totals")
      .select("*");

    if (error) throw error;

    let processed = 0;

    for (const catalog of catalogs) {
      const count = await processCatalog(catalog);
      processed += count;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "royalty_distribution_complete",
        payouts_processed: processed
      })
    };

  } catch (err) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message
      })
    };

  }

};
