export const handler = async()=>{

 return{
  statusCode:200,
  body:JSON.stringify({
   protocol:"TKFM_GLOBAL_MUSIC_NETWORK",
   endpoints:[
    "/.netlify/functions/tkfm-network-node",
    "/.netlify/functions/tkfm-peer-discovery",
    "/.netlify/functions/tkfm-catalog-broadcast",
    "/.netlify/functions/tkfm-global-royalty-oracle",
    "/.netlify/functions/tkfm-license-protocol"
   ]
  })
 };

};
