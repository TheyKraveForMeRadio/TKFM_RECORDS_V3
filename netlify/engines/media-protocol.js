export const handler = async()=>{

 return{
  statusCode:200,
  body:JSON.stringify({
   protocol:"TKFM_UNIVERSAL_MEDIA_PROTOCOL",
   endpoints:[
    "/.netlify/functions/api/media-registry",
    "/.netlify/functions/api/media-rights-engine",
    "/.netlify/functions/api/universal-licensing",
    "/.netlify/functions/api/media-oracle"
   ]
  })
 }

}
