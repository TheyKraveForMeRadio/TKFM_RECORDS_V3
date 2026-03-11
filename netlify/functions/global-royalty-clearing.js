export const handler = async () => {

 return {
  statusCode:200,
  body:JSON.stringify({
   network:"GLOBAL_ROYALTY_CLEARING",
   settlement_layers:[
    "streaming_royalties",
    "catalog_dividends",
    "creator_banking_payouts"
   ]
  })
}
