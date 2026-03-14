export const handler = async () => {

 return {
  statusCode: 200,
  body: JSON.stringify({
   bank: "TKFM_CREATOR_BANK",
   endpoints: [
    "/.netlify/functions/api/creator-bank-core",
    "/.netlify/functions/api/royalty-collateral-engine",
    "/.netlify/functions/api/creator-credit-underwriting",
    "/.netlify/functions/api/creator-loan-engine",
    "/.netlify/functions/api/creator-bond-market"
   ]
  })
}
}
