import bus from "./_event-bus.js";
export const handler = async()=>{

 return{
  statusCode:200,
  body:JSON.stringify({
   protocol:"TKFM_GLOBAL_MUSIC_NETWORK",
   endpoints:[
    "/.netlify/functions/api/tkfm-network-node",
    "/.netlify/functions/api/tkfm-peer-discovery",
    "/.netlify/functions/api/tkfm-catalog-broadcast",
    "/.netlify/functions/api/tkfm-global-royalty-oracle",
    "/.netlify/functions/api/tkfm-license-protocol"
   ]
  })
 };

};
