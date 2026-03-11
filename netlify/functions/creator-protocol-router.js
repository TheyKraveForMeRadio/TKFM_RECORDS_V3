export const handler = async(event) => {

 const { service } = event.queryStringParameters || {}

 const routes = {
  bank:"/.netlify/functions/creator-bank-core",
  exchange:"/.netlify/functions/creator-exchange-api",
  payments:"/.netlify/functions/global-payment-rail",
  centralbank:"/.netlify/functions/creator-central-bank",
  os:"/.netlify/functions/creator-os-core"
 }

 return {
  statusCode:200,
  body:JSON.stringify({
   service,
   route:routes[service] || "unknown_service"
  })
}
}
