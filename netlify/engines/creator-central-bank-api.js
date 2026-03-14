export const handler = async () => {

 return {
  statusCode: 200,
  body: JSON.stringify({
   bank:"TKFM_CREATOR_CENTRAL_BANK",
   endpoints:[
    "/.netlify/functions/api/creator-central-bank",
    "/.netlify/functions/api/royalty-reserve-engine",
    "/.netlify/functions/api/creator-stablecoin-engine",
    "/.netlify/functions/api/ai-monetary-policy",
    "/.netlify/functions/api/creator-gdp-index"
   ]
  })
}
}
