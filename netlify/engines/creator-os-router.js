export const handler = async (event) => {

 const { module } = event.queryStringParameters || {}

 const routes = {
  bank:"/.netlify/functions/api/creator-bank-core",
  exchange:"/.netlify/functions/api/creator-exchange-api",
  centralbank:"/.netlify/functions/api/creator-central-bank",
  payments:"/.netlify/functions/api/global-payment-rail"
 }

 return {
  statusCode:200,
  body:JSON.stringify({
   route:routes[module] || "module_not_found"
  })
}
}
