export const handler = async()=>{

 return{
  statusCode:200,
  body:JSON.stringify({
   exchange:"TKFM_GLOBAL_CREATOR_EXCHANGE",
   endpoints:[
    "/.netlify/functions/creator-asset-registry",
    "/.netlify/functions/creator-exchange-orderbook",
    "/.netlify/functions/creator-exchange-match",
    "/.netlify/functions/creator-liquidity-pools"
   ]
  })
 }

}
