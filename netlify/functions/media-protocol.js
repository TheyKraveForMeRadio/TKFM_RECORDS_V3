export const handler = async()=>{

 return{
  statusCode:200,
  body:JSON.stringify({
   protocol:"TKFM_UNIVERSAL_MEDIA_PROTOCOL",
   endpoints:[
    "/.netlify/functions/media-registry",
    "/.netlify/functions/media-rights-engine",
    "/.netlify/functions/universal-licensing",
    "/.netlify/functions/media-oracle"
   ]
  })
 }

}
