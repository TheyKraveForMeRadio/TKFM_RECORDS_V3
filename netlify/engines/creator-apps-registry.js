import bus from "./_event-bus.js";
let apps = []

export const handler = async (event) => {

 if(event.httpMethod === "POST"){

  const body = JSON.parse(event.body)

  apps.push({
   name:body.name,
   developer:body.developer,
   url:body.url,
   created:new Date().toISOString()
  })

 }

 return {
  statusCode:200,
  body:JSON.stringify({
   marketplace:"TKFM_CREATOR_APPS",
   apps
  })
}
}
