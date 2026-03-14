import bus from "./_event-bus.js";
export const handler = async () => {

 return {
  statusCode:200,
  body:JSON.stringify({
   engine:"AI_LABEL_DISCOVERY",
   sources:[
    "tiktok",
    "spotify_trending",
    "youtube_music"
   ]
  })
}
}
