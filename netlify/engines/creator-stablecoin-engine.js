import bus from "./_event-bus.js";
export const handler = async(event)=>{

 const body = JSON.parse(event.body)

 const { amount } = body

 return{
  statusCode:200,
  body:JSON.stringify({
   currency:"TKFM",
   issued:amount
  })
}
}
