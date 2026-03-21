const fetch = require("node-fetch")

exports.handler = async function () {

  try {

    const base =
      process.env.SELF_BASE_URL + "/.netlify/functions/api"

    const [
      index,
      vix,
      market,
      liquidity
    ] = await Promise.all([

      fetch(base + "/music-index-engine").then(r=>r.json()),
      fetch(base + "/music-vix-engine").then(r=>r.json()),
      fetch(base + "/catalog-market-data").then(r=>r.json()),
      fetch(base + "/liquidity-stats").then(r=>r.json())

    ])

    return {
      statusCode:200,
      body:JSON.stringify({

        terminal:"TKFM MARKET TERMINAL",

        music_index:index.index_value || 0,

        music_vix:vix.volatility_index || 0,

        market_cap:market.market_cap || 0,

        top_assets:(market.market || []).slice(0,10),

        liquidity:liquidity.total_liquidity || 0

      })
    }

  } catch(err) {

    return {
      statusCode:500,
      body:JSON.stringify({error:err.message})
    }

  }

}
