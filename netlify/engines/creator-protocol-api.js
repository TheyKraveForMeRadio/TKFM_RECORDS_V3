export const handler = async () => {

 return {
  statusCode:200,
  body:JSON.stringify({
   protocol:"TKFM_CREATOR_PROTOCOL",
   services:[
    "creator_bank",
    "creator_exchange",
    "creator_central_bank",
    "creator_payment_rail",
    "creator_os",
    "creator_internet"
   ]
  })
}
}
