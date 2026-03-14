export const handler = async () => {

 return {
  statusCode:200,
  body:JSON.stringify({
   economy:"TKFM_AUTONOMOUS_MUSIC_ECONOMY",
   agents:[
    "/.netlify/functions/api/ai-label-agent",
    "/.netlify/functions/api/ai-market-agent",
    "/.netlify/functions/api/ai-treasury-agent",
    "/.netlify/functions/api/ai-creator-agent"
   ]
  })
}
}
