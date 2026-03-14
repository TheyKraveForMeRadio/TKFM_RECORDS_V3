export const handler = async () => {

 return {
  statusCode:200,
  body:JSON.stringify({
   agent:"AI_TREASURY_AGENT",
   tasks:[
    "capital_allocation",
    "yield_optimization",
    "liquidity_management"
   ]
  })
}
}
