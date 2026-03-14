import bus from "./_event-bus.js";
export const handler = async()=>{

 return{
  statusCode:200,
  body:JSON.stringify({
   protocol:"TKFM_GLOBAL_MUSIC_INTERNET",
   endpoints:[
    "/.netlify/functions/api/tkfm-node-registry",
    "/.netlify/functions/api/tkfm-music-dns",
    "/.netlify/functions/api/tkfm-catalog-host",
    "/.netlify/functions/api/tkfm-protocol-router"
   ]
  })
 }

}
