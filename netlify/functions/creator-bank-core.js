export const handler = async () => {

 return {
  statusCode: 200,
  body: JSON.stringify({
   bank: "TKFM_GLOBAL_CREATOR_BANK",
   services: [
    "catalog_loans",
    "royalty_credit_lines",
    "creator_bonds",
    "yield_pools"
   ],
   status: "online",
   timestamp: new Date().toISOString()
  })
}
}
