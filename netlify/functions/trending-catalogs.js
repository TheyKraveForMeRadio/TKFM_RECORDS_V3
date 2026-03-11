const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async function () {

  const { data: catalogs } = await supabase
    .from("catalog_revenue_totals")
    .select("*");

  const { data: trades } = await supabase
    .from("trades")
    .select("*");

  const trend = catalogs.map(c => {

    const demand = trades.filter(
      t => t.catalog_id === c.catalog_id
    ).length;

    return {
      catalog_id: c.catalog_id,
      score: c.total_revenue + demand
    };

  });

  trend.sort((a,b)=>b.score-a.score);

  return {
    statusCode:200,
    body:JSON.stringify(trend.slice(0,20))
  };

};
