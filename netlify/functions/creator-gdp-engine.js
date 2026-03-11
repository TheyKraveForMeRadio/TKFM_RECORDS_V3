export const handler = async () => {

 return {
  statusCode:200,
  body:JSON.stringify({
   metric:"CREATOR_GDP",
   sectors:[
    "music",
    "video",
    "podcasts",
    "streaming",
    "creator_apps"
   ],
   value_estimate:"$250B+"
  })
}
