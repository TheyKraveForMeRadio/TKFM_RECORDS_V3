import { redis } from "./redis-cache.js"

const BASE = process.env.SELF_BASE_URL || "https://tkfmrecords.com"

async function dispatch(event){

const routes = {

trade_executed:[
"record-catalog-price",
"catalog-price-history",
"fan-portfolio-engine",
"market-tv-feed"
],

song_uploaded:[
"catalog-upload-tracker",
"artist-leaderboard",
"trending-catalogs"
],

royalty_generated:[
"royalty-payout-processor",
"fan-portfolio-engine",
"investor-dashboard"
],

artist_joined:[
"artist-leaderboard",
"platform-growth-engine"
]

}

const handlers = routes[event.type] || []

for(const fn of handlers){

try{

await fetch(BASE + "/.netlify/functions/" + fn,{
method:"POST",
headers:{ "content-type":"application/json" },
body:JSON.stringify(event)
})

}catch(e){

console.log("event dispatch error",fn,e)

}

}

}

export default async (req) => {

try{

const event = JSON.parse(req.body || "{}")

event.timestamp = Date.now()

/* STORE EVENT HISTORY */

await redis.set(
"event:"+event.timestamp,
JSON.stringify(event),
{EX:300}
)

/* TRADE FEED RECORDING */

if(event.type === "trade_executed"){

await redis.lpush(
"trade_feed",
JSON.stringify({
catalog_id:event.catalog_id,
price:event.price,
shares:event.shares,
time:Date.now()
})
)

await redis.ltrim("trade_feed",0,50)

}

/* DISPATCH TO SYSTEMS */

await dispatch(event)

return {
statusCode:200,
body:JSON.stringify({
status:"event processed",
event:event.type
})
}

}catch(e){

console.log("event bus error",e)

return {
statusCode:500,
body:"event bus failure"
}

}

}
