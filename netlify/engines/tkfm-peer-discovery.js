import bus from "./_event-bus.js";
export const handler = async()=>{

 const peers = [
  "https://tkfmrecords.com",
  "https://node1.tkfm.network",
  "https://node2.tkfm.network"
 ];

 return{
  statusCode:200,
  body:JSON.stringify({
   network:"TKFM_GLOBAL_MUSIC_NETWORK",
   peers
  })
 };

};
