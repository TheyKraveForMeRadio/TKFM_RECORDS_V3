export const handler = async () => {

 return {
  statusCode: 200,
  body: JSON.stringify({
   bank:"TKFM_CREATOR_CENTRAL_BANK",
   endpoints:[
    "/.netlify/functions/creator-central-bank",
    "/.netlify/functions/royalty-reserve-engine",
    "/.netlify/functions/creator-stablecoin-engine",
    "/.netlify/functions/ai-monetary-policy",
    "/.netlify/functions/creator-gdp-index"
   ]
  })
}
}
