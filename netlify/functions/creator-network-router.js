export const handler = async () => {

 return {
  statusCode:200,
  body:JSON.stringify({
   router:"TKFM_CREATOR_NETWORK_ROUTER",
   routes:[
    "/creator-upload",
    "/catalog-marketplace",
    "/royalty-yield",
    "/creator-bank"
   ]
  })
}
}
