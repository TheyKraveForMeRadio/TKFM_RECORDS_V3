export const handler = async()=>{

 return{
  statusCode:200,
  body:JSON.stringify({
   civilization:"TKFM_AUTONOMOUS_MUSIC_CIVILIZATION",
   status:"running",
   timestamp:new Date().toISOString()
  })
 }

}
