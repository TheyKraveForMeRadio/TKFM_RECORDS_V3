export const handler = async () => {

 const decision = {
  treasury_policy:"stable",
  interest_rate:4.2,
  liquidity_policy:"expand",
  market_status:"healthy"
 }

 return{
  statusCode:200,
  body:JSON.stringify(decision)
 }
}
