export const handler = async () => {

 return {
  statusCode:200,
  body:JSON.stringify({
   market:"CREATOR_BONDS",
   instruments:[
    "catalog_revenue_bonds",
    "artist_future_earnings",
    "tour_revenue_bonds"
   ]
  })
}
