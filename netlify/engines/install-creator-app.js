import bus from "./_event-bus.js";
export const handler = async(event)=>{

 const body = JSON.parse(event.body)

 return {
  statusCode:200,
  body:JSON.stringify({
   installed:true,
   app:body.app,
   user:body.user
  })
}
}
