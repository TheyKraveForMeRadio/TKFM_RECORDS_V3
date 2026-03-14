import bus from "./_event-bus.js";
export const handler = async()=>{

 return{
  statusCode:200,
  body:JSON.stringify({
   oracle:"TKFM_MEDIA_ORACLE",
   metrics:[
    "streams",
    "views",
    "downloads",
    "ticket_sales"
   ]
  })
 }

}
