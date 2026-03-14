import bus from "./_event-bus.js";
export const handler = async () => {

 return {
  statusCode:200,
  body:JSON.stringify({
   network:"TKFM_CREATOR_NETWORK",
   components:[
    "creator_protocol",
    "creator_exchange",
    "creator_bank",
    "creator_os",
    "creator_internet"
   ]
  })
}
}
