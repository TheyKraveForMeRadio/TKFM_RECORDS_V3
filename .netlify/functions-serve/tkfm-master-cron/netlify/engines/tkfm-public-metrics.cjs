
const Redis = require("ioredis")

const redis = new Redis(process.env.REDIS_URL)

exports.handler = async function(){

const data =
await redis.get("tkfm_global_metrics")

return {
statusCode:200,
body:data || "{}"
}

}

