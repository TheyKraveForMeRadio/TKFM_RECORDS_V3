import bus from "./_event-bus.js";
export const handler = async()=>{

 return{
  statusCode:200,
  body:JSON.stringify({
   node:"TKFM_NODE",
   status:"online",
   timestamp:new Date().toISOString()
  })
 };

};
