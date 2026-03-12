const BASE = process.env.SELF_BASE_URL || "https://tkfmrecords.com"

async function call(fn){
try{
await fetch(BASE + "/.netlify/functions/" + fn)
}catch(e){
console.log("cron error",fn,e)
}
}

export default async () => {

const minute = new Date().getMinutes()

/* every minute */

await call("matching-engine")
await call("market-maker-ai")
await call("market-maker-orders")

/* every 5 minutes */

if(minute % 5 === 0){
await call("catalog-price-history")
await call("record-catalog-price")
await call("live-catalog-price")
await call("platform-growth-engine")
}

/* every 10 minutes */

if(minute % 10 === 0){
await call("distribution-router")
await call("deliver-to-platforms")
await call("fan-invest-catalog")
await call("buy-catalog-shares")
}

/* every 30 minutes */

if(minute % 30 === 0){
await call("spotify-royalty-sync")
await call("streaming-revenue-oracle")
}

/* hourly */

if(minute === 0){
await call("music-index-engine")
await call("trending-index-engine")
}

return {
statusCode:200,
body:"TKFM master cron executed"
}

}
