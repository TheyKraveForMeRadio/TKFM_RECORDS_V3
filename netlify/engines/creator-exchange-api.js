import bus from "./_event-bus.js";
export const handler = async()=>{

 return{
  statusCode:200,
  body:JSON.stringify({
   exchange:"TKFM_GLOBAL_CREATOR_EXCHANGE",
   endpoints:[
    "/.netlify/functions/api/creator-asset-registry",
    "/.netlify/functions/api/creator-exchange-orderbook",
    "/.netlify/functions/api/creator-exchange-match",
    "/.netlify/functions/api/creator-liquidity-pools"
   ]
  })
 }

}
