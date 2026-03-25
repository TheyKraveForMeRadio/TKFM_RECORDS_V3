
const Redis = require("ioredis")

const redis = new Redis(process.env.REDIS_URL)

exports.handler = async function(){

try{

const metrics = {
timestamp:Date.now(),
market_cap: Math.floor(Math.random()*100000000),
trade_volume: Math.floor(Math.random()*10000),
active_engines: 900
}

await redis.set(
"tkfm_global_metrics",
JSON.stringify(metrics),
"EX",
60
)

return {
statusCode:200,
body:JSON.stringify({
status:"metrics cached",
metrics
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}

