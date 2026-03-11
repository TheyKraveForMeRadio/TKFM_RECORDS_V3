export const handler = async () => {

 return {
  statusCode:200,
  body:JSON.stringify({
   platform:"TKFM_CAPITAL_MARKETS",
   endpoints:[
    "/.netlify/functions/capital-markets-engine",
    "/.netlify/functions/catalog-etf-engine",
    "/.netlify/functions/creator-bond-engine"
   ]
  })
}
