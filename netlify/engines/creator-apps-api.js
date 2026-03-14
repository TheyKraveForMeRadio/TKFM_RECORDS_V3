import bus from "./_event-bus.js";
export const handler = async () => {

 return {
  statusCode:200,
  body:JSON.stringify({
   platform:"TKFM_CREATOR_APPS",
   categories:[
    "AI_LABELS",
    "ROYALTY_FUNDS",
    "FAN_TOKENS",
    "CREATOR_BANKING",
    "MUSIC_ANALYTICS"
   ]
  })
}
}
