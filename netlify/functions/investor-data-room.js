export const handler = async () => {

 const sections = {

  platform_metrics:"/.netlify/functions/executive-metrics",

  investor_terminal:"/.netlify/functions/investor-terminal",

  capital_markets:"/.netlify/functions/capital-markets-engine",

  creator_gdp:"/.netlify/functions/creator-gdp-engine"

 }

 return {

  statusCode:200,

  body:JSON.stringify({

   data_room:"TKFM_INVESTOR_DATA_ROOM",

   sections,

   timestamp:new Date().toISOString()

  })

 }
}
