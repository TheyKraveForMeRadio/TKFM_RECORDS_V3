export const handler = async () => {

 return {
  statusCode: 200,
  body: JSON.stringify({
   rail:"TKFM_GLOBAL_PAYMENT_RAIL",
   endpoints:[
    "/.netlify/functions/api/global-payment-rail",
    "/.netlify/functions/api/creator-wallet-engine",
    "/.netlify/functions/api/royalty-settlement-engine",
    "/.netlify/functions/api/creator-payout-engine",
    "/.netlify/functions/api/investor-dividend-engine"
   ]
  })
}
}
