exports.handler = async function() {

  try {

    const engines = [
      "music-index-engine",
      "music-etf-rebalance-engine",
      "music-hedge-fund-engine",
      "global-liquidity-engine",
      "market-surveillance-engine"
    ]

    const results = []

    for (const engine of engines) {

      try {

        const res = await fetch(
          `/.netlify/functions/api/${engine}`
        )

        const data = await res.json()

        results.push({
          engine,
          status: "ok",
          result: data
        })

      } catch (err) {

        results.push({
          engine,
          status: "failed",
          error: err.message
        })

      }

    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "economy cycle complete",
        engines_run: engines.length,
        results
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
