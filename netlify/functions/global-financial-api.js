export const handler = async () => {

 return {
  statusCode:200,
  body:JSON.stringify({
   platform:"TKFM_GLOBAL_CREATOR_FINANCIAL_SYSTEM",
   endpoints:[
    "/.netlify/functions/global-creator-financial-core",
    "/.netlify/functions/creator-gdp-engine",
    "/.netlify/functions/global-royalty-clearing",
    "/.netlify/functions/global-creator-fund"
   ]
  })
}
