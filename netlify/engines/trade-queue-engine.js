
const queue = global.tkfm_trade_queue || (global.tkfm_trade_queue = [])

exports.handler = async function(event) {

  try {

    const trade = JSON.parse(event.body || "{}")

    if (!trade.catalog_id || !trade.price || !trade.quantity || !trade.side) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "invalid trade payload"
        })
      }
    }

    const id = Date.now() + "-" + Math.floor(Math.random()*100000)

    queue.push({
      id,
      catalog_id: trade.catalog_id,
      price: trade.price,
      quantity: trade.quantity,
      side: trade.side,
      timestamp: Date.now()
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "trade queued",
        id,
        queue_size: queue.length
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

