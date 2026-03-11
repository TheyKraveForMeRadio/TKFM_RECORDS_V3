export const handler = async () => {

 return {
  statusCode:200,
  body:JSON.stringify({
   node:"TKFM_CREATOR_NODE",
   services:[
    "catalog_hosting",
    "royalty_tracking",
    "creator_identity",
    "streaming_data_feed"
   ],
   timestamp:new Date().toISOString()
  })
}
}
