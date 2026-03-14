import bus from "./_event-bus.js";
export const handler = async()=>{

 return{
  statusCode:200,
  body:JSON.stringify({
   bridge:"TKFM_CHAIN_BRIDGE",
   chains:[
    "TKFM_L1",
    "Ethereum",
    "Base",
    "Polygon"
   ]
  })
 };

};
