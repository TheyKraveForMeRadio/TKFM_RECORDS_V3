import bus from "./_event-bus.js";
export const handler = async()=>{

 return{

  statusCode:200,

  body:JSON.stringify({

   chain:"TKFM Layer1",
   chainId:7777,
   status:"running"

  })

 };

};
