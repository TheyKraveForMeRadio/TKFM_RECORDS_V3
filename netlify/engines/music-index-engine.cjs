const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async function () {

  try {

    const { data, error } = await supabase
      .from("catalog_assets")
      .select("catalog_id, market_cap, volume")
      .order("market_cap", { ascending: false })
      .limit(50)

    if (error) {
      throw error
    }

    let totalMarketCap = 0
    let totalVolume = 0

    for (const asset of data) {
      totalMarketCap += asset.market_cap || 0
      totalVolume += asset.volume || 0
    }

    const indexValue =
      data.length > 0 ? totalMarketCap / data.length : 0

    return {
      statusCode: 200,
      body: JSON.stringify({
        index_name: "TKFM GLOBAL MUSIC INDEX",
        assets: data.length,
        total_market_cap: totalMarketCap,
        total_volume: totalVolume,
        index_value: Number(indexValue.toFixed(4))
      })
    }

  } catch (err) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message
      })
    }

  }

}
