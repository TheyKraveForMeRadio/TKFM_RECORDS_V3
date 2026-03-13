const BASE = process.env.SELF_BASE_URL || "https://tkfmrecords.com"

async function call(fn){
  try{
    await fetch(BASE + "/.netlify/functions/" + fn)
  }catch(e){
    console.log("cron error",fn,e)
  }
}

export const handler = async () => {

  const minute = new Date().getMinutes()

  /* CORE MARKET SYSTEM (PARALLEL) */

  await Promise.all([
    call("trade-queue-worker"),
    call("matching-engine"),
    call("market-maker-ai"),
    call("market-maker-orders"),
    call("catalog-price-oracle"),
    call("ai-market-maker-engine"),
    call("market-surveillance-engine"),
    call("trade-risk-engine"),
    call("global-clearinghouse-engine")
  ])

  /* EVERY 5 MINUTES */

  if(minute % 5 === 0){

    await Promise.all([
      call("catalog-price-history"),
      call("record-catalog-price"),
      call("live-catalog-price"),
      call("platform-growth-engine")
    ])

  }

  /* EVERY 10 MINUTES */

  if(minute % 10 === 0){

    await Promise.all([
      call("distribution-router"),
      call("deliver-to-platforms"),
      call("fan-invest-catalog"),
      call("buy-catalog-shares")
    ])

  }

  /* EVERY 30 MINUTES */

  if(minute % 30 === 0){

    await Promise.all([
      call("spotify-royalty-sync"),
      call("streaming-revenue-oracle")
    ])

  }

  /* HOURLY */

  if(minute === 0){

    await Promise.all([
      call("music-index-engine"),
      call("music-etf-engine"),
      call("music-derivatives-engine"),
      call("music-derivatives-clearing-engine"),
      call("music-derivatives-margin-engine"),
      call("trending-index-engine"),
      call("music-economy-simulator-engine"),
      call("music-central-bank-engine"),
      call("tkfm-ai-governor-engine"),
      call("regulatory-compliance-engine"),
      call("global-regulatory-engine"),
      call("tkfm-global-liquidity-router"),
      call("tkfm-node-network-engine")
    ])

  }

  return {
    statusCode:200,
    body:"TKFM master cron executed"
  }

}
