const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function calculatePrice(revenue, demandScore, liquidity) {
  const base = revenue * 10;
  const demandMultiplier = 1 + demandScore * 0.2;
  const liquidityFactor = liquidity > 0 ? 1 + liquidity / 10000 : 1;

  return base * demandMultiplier * liquidityFactor;
}

exports.handler = async function () {
  try {

    const { data: catalogs } = await supabase
      .from("catalog_revenue_totals")
      .select("*");

    let results = [];

    for (const catalog of catalogs) {

      const { data: trades } = await supabase
        .from("trades")
        .select("*")
        .eq("catalog_id", catalog.catalog_id);

      const demandScore = trades ? trades.length : 0;

      const { data: liquidity } = await supabase
        .from("liquidity_pools")
        .select("*")
        .eq("catalog_id", catalog.catalog_id)
        .single();

      const pool = liquidity ? liquidity.total_liquidity : 0;

      const price = calculatePrice(
        catalog.total_revenue,
        demandScore,
        pool
      );

      await supabase.from("price_history").insert({
        catalog_id: catalog.catalog_id,
        price,
        timestamp: new Date().toISOString()
      });

      results.push({
        catalog: catalog.catalog_id,
        price
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "price_engine_complete",
        catalogs: results
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
