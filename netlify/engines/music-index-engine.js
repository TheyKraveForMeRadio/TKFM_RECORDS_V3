const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async function() {

  try {

    const { data } = await supabase
      .from("catalog_market")
      .select("*")

    let total_market_cap = 0
    let total_volume = 0

    for (const asset of data) {
      total_market_cap += asset.market_cap
      total_volume += asset.volume
    }

    const index_value = total_market_cap / (data.length || 1)

    return {
      statusCode: 200,
      body: JSON.stringify({
        index_name: "TKFM INDEX",
        assets: data.length,
        total_market_cap,
        total_volume,
        index_value
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
