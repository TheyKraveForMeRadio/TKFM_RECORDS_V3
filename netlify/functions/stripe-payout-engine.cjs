const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

module.exports = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}")
    const { request_id } = body

    const payout = {
      id: "mock_payout_" + Date.now()
    }

    return {
      statusCode:200,
      body:JSON.stringify({
        status:"paid",
        payout_id: payout.id
      })
    }

  } catch(err){
    return { statusCode:500, body:err.message }
  }
}
