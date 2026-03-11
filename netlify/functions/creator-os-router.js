export const handler = async (event) => {

 const { module } = event.queryStringParameters || {}

 const routes = {
  bank:"/.netlify/functions/creator-bank-core",
  exchange:"/.netlify/functions/creator-exchange-api",
  centralbank:"/.netlify/functions/creator-central-bank",
  payments:"/.netlify/functions/global-payment-rail"
 }

 return {
  statusCode:200,
  body:JSON.stringify({
   route:routes[module] || "module_not_found"
  })
}
}
