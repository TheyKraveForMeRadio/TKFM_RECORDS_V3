export const handler = async () => {

 return {
  statusCode:200,
  body:JSON.stringify({
   os:"TKFM_CREATOR_OS",
   endpoints:[
    "/.netlify/functions/creator-os-core",
    "/.netlify/functions/creator-os-router",
    "/.netlify/functions/ai-creator-governor"
   ]
  })
}
}
