export const handler = async () => {

 return {
  statusCode:200,
  body:JSON.stringify({
   economy:"TKFM_AUTONOMOUS_MUSIC_ECONOMY",
   agents:[
    "/.netlify/functions/ai-label-agent",
    "/.netlify/functions/ai-market-agent",
    "/.netlify/functions/ai-treasury-agent",
    "/.netlify/functions/ai-creator-agent"
   ]
  })
}
}
