export const handler = async () => {

 return {
  statusCode: 200,
  body: JSON.stringify({
   protocol: "TKFM_DIGITAL_UNIVERSE",
   endpoints: [
    "/.netlify/functions/api/tkfm-digital-universe",
    "/.netlify/functions/api/universe-asset-registry",
    "/.netlify/functions/api/universe-governor",
    "/.netlify/functions/api/universe-finance"
   ]
  })
 }

}
