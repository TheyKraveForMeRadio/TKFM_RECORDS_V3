import { redis } from "./redis-cache.js"

export default async () => {

const trades = await redis.lrange("trade_feed",0,20)

const parsed = trades.map(t=>JSON.parse(t))

return {
statusCode:200,
body:JSON.stringify({trades:parsed})
}

}
