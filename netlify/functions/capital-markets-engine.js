export const handler = async () => {

 return {
  statusCode:200,
  body:JSON.stringify({
   engine:"CREATOR_CAPITAL_MARKETS",
   instruments:[
    "royalty_stocks",
    "catalog_etfs",
    "creator_bonds",
    "music_derivatives",
    "royalty_futures"
   ],
   timestamp:new Date().toISOString()
  })
}
