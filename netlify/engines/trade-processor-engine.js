const Redis = require("ioredis")
const fetch = require("node-fetch")

const redis = new Redis(process.env.REDIS_URL)

async function processTrades(){

while(true){

try{

const stream =
await redis.xread(
"BLOCK",0,
"STREAMS",
"tkfm_trade_stream",
"$"
)

if(!stream) continue

const trades = stream[0][1]

for(const entry of trades){

const data = entry[1]

const trade = {
catalog_id:data[1],
price:Number(data[3]),
quantity:Number(data[5]),
side:data[7]
}

await fetch(
process.env.SELF_BASE_URL +
"/.netlify/functions/api/matching-engine",
{
method:"POST",
headers:{"content-type":"application/json"},
body:JSON.stringify(trade)
})

}

}catch(err){

console.error("trade processor error",err)

}

}

}

exports.handler = async function(){

processTrades()

return {
statusCode:200,
body:JSON.stringify({
status:"trade processor running"
})
}

}
