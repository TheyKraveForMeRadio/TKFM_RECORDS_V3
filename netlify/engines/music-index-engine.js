exports.handler = async function () {

  try {

    return {
      statusCode: 200,
      body: JSON.stringify({
        index_name: "TKFM INDEX",
        assets: 3,
        total_market_cap: 11200000,
        total_volume: 8,
        index_value: 3733333.3333
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
