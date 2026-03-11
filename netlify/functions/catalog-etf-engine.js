export const handler = async () => {

 return {
  statusCode:200,
  body:JSON.stringify({
   etf:"TKFM_CATALOG_INDEX",
   components:[
    "top_streaming_catalogs",
    "emerging_artists",
    "hiphop_index",
    "global_music_index"
   ]
  })
}
