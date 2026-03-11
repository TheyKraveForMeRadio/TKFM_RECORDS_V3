export const handler = async () => {

 return {
  statusCode:200,
  body:JSON.stringify({
   fund:"TKFM_CREATOR_GLOBAL_FUND",
   assets:[
    "catalog_equity",
    "royalty_bonds",
    "creator_etfs"
   ]
  })
}
