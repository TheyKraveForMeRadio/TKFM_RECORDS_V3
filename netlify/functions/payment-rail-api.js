export const handler = async () => {

 return {
  statusCode: 200,
  body: JSON.stringify({
   rail:"TKFM_GLOBAL_PAYMENT_RAIL",
   endpoints:[
    "/.netlify/functions/global-payment-rail",
    "/.netlify/functions/creator-wallet-engine",
    "/.netlify/functions/royalty-settlement-engine",
    "/.netlify/functions/creator-payout-engine",
    "/.netlify/functions/investor-dividend-engine"
   ]
  })
}
}
