const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function calculateInvestorPortfolio(investor_id) {

  const { data: holdings, error } = await supabase
    .from("token_holders")
    .select("*")
    .eq("holder_id", investor_id);

  if (error) throw error;

  let total_value = 0;
  let total_revenue = 0;

  for (const holding of holdings) {

    const { data: catalog } = await supabase
      .from("catalog_revenue_totals")
      .select("*")
      .eq("catalog_id", holding.catalog_id)
      .single();

    if (!catalog) continue;

    const ownership = holding.token_balance / catalog.total_tokens;
    const investor_value = catalog.total_revenue * ownership;

    total_value += investor_value;
    total_revenue += investor_value;
  }

  const apy = total_value > 0 ? (total_revenue / total_value) * 100 : 0;

  await supabase
    .from("investor_portfolios")
    .upsert({
      investor_id,
      portfolio_value: total_value,
      portfolio_revenue: total_revenue,
      apy: apy,
      updated_at: new Date().toISOString()
    }, { onConflict: "investor_id" });

}

exports.handler = async function () {

  try {

    const { data: investors, error } = await supabase
      .from("investor_balances")
      .select("investor_id");

    if (error) throw error;

    let processed = 0;

    for (const investor of investors) {

      await calculateInvestorPortfolio(investor.investor_id);
      processed++;

    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "portfolio_engine_complete",
        investors_processed: processed
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
