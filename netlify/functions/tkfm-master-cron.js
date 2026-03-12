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

  /* EVERY MINUTE — CORE MARKET SYSTEM */

  await call("trade-queue-worker")
  await call("matching-engine")
  await call("market-maker-ai")
  await call("market-maker-orders")

  /* PRICE DISCOVERY */

  await call("catalog-price-oracle")

  /* AI MARKET MAKER */

  await call("ai-market-maker-engine")

  /* MARKET SURVEILLANCE */

  await call("market-surveillance-engine")

  /* EVERY 5 MINUTES — PRICE + GROWTH */

  if(minute % 5 === 0){

    await call("catalog-price-history")
    await call("record-catalog-price")
    await call("live-catalog-price")
    await call("platform-growth-engine")

  }

  /* EVERY 10 MINUTES — DISTRIBUTION + INVESTMENT */

  if(minute % 10 === 0){

    await call("distribution-router")
    await call("deliver-to-platforms")
    await call("fan-invest-catalog")
    await call("buy-catalog-shares")

  }

  /* EVERY 30 MINUTES — STREAMING ORACLE */

  if(minute % 30 === 0){

    await call("spotify-royalty-sync")
    await call("streaming-revenue-oracle")

  }

  /* HOURLY — INDEX + ECONOMY MODEL */

  if(minute === 0){

    await call("music-index-engine")
    await call("trending-index-engine")
    await call("music-economy-simulator-engine")

  }

  return {
    statusCode:200,
    body:"TKFM master cron executed"
  }

}
