import { redis } from "./redis-cache.js"

export default async (req) => {

const trade = JSON.parse(req.body || "{}")

trade.timestamp = Date.now()

await redis.rpush("trade_queue", JSON.stringify(trade))

return {
statusCode:200,
body:JSON.stringify({
status:"queued",
trade
})
}

}
