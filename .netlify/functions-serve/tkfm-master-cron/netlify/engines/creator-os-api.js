import bus from "./_event-bus.js";
export const handler = async () => {

 return {
  statusCode:200,
  body:JSON.stringify({
   os:"TKFM_CREATOR_OS",
   endpoints:[
    "/.netlify/functions/api/creator-os-core",
    "/.netlify/functions/api/creator-os-router",
    "/.netlify/functions/api/ai-creator-governor"
   ]
  })
}
}
