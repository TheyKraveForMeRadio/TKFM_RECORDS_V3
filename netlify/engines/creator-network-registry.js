import bus from "./_event-bus.js";
let nodes = []

export const handler = async(event) => {

 if(event.httpMethod === "POST"){

  const body = JSON.parse(event.body)

  nodes.push({
   node:body.node,
   joined:new Date().toISOString()
  })

 }

 return {
  statusCode:200,
  body:JSON.stringify({
   network:"TKFM_CREATOR_NETWORK",
   nodes
  })
}
}
