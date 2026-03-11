export const handler = async () => {

 return {
  statusCode: 200,
  body: JSON.stringify({
   bank: "TKFM_CREATOR_BANK",
   endpoints: [
    "/.netlify/functions/creator-bank-core",
    "/.netlify/functions/royalty-collateral-engine",
    "/.netlify/functions/creator-credit-underwriting",
    "/.netlify/functions/creator-loan-engine",
    "/.netlify/functions/creator-bond-market"
   ]
  })
}
}
