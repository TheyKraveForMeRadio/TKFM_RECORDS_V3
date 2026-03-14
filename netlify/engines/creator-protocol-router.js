import bus from "./_event-bus.js";
export const handler = async(event) => {

 const { service } = event.queryStringParameters || {}

 const routes = {
  bank:"/.netlify/functions/api/creator-bank-core",
  exchange:"/.netlify/functions/api/creator-exchange-api",
  payments:"/.netlify/functions/api/global-payment-rail",
  centralbank:"/.netlify/functions/api/creator-central-bank",
  os:"/.netlify/functions/api/creator-os-core"
 }

 return {
  statusCode:200,
  body:JSON.stringify({
   service,
   route:routes[service] || "unknown_service"
  })
}
}
