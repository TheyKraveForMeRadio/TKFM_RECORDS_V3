export const handler = async () => {

 return {
  statusCode: 200,
  body: JSON.stringify({
   protocol: "TKFM_DIGITAL_UNIVERSE",
   endpoints: [
    "/.netlify/functions/tkfm-digital-universe",
    "/.netlify/functions/universe-asset-registry",
    "/.netlify/functions/universe-governor",
    "/.netlify/functions/universe-finance"
   ]
  })
 }

}
