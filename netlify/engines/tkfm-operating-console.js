export const handler = async () => {

 const sections = {
  creators:"/.netlify/functions/api/create-creator-identity",
  wallets:"/.netlify/functions/api/creator-wallet-balance",
  catalogs:"/.netlify/functions/api/catalogs-list",
  royalty_yield:"/.netlify/functions/api/royalty-yield-engine",
  capital_markets:"/.netlify/functions/api/capital-markets-engine",
  creator_gdp:"/.netlify/functions/api/creator-gdp-engine"
 }

 return {
  statusCode:200,
  body:JSON.stringify({
   console:"TKFM_OPERATING_CONSOLE",
   modules:sections,
   timestamp:new Date().toISOString()
  })
 }
}
