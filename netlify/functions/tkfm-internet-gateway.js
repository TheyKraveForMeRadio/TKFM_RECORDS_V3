export const handler = async()=>{

 return{
  statusCode:200,
  body:JSON.stringify({
   protocol:"TKFM_GLOBAL_MUSIC_INTERNET",
   endpoints:[
    "/.netlify/functions/tkfm-node-registry",
    "/.netlify/functions/tkfm-music-dns",
    "/.netlify/functions/tkfm-catalog-host",
    "/.netlify/functions/tkfm-protocol-router"
   ]
  })
 }

}
