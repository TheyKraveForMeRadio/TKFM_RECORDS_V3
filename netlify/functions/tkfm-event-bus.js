import { cacheSet } from "./redis-cache.js"

const BASE = process.env.SELF_BASE_URL || "https://tkfmrecords.com"

async function dispatch(event){

const targets = {

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

const handlers = targets[event.type] || []

for(const fn of handlers){

try{

await fetch(BASE + "/.netlify/functions/" + fn,{
method:"POST",
headers:{ "content-type":"application/json" },
body:JSON.stringify(event)
})

}catch(e){
console.log("event dispatch error",fn)
}

}

}

export default async (req) => {

const event = JSON.parse(req.body || "{}")

event.timestamp = Date.now()

await cacheSet("event:"+event.timestamp,event,300)

await dispatch(event)

return {
statusCode:200,
body:JSON.stringify({status:"event processed"})
}

}
