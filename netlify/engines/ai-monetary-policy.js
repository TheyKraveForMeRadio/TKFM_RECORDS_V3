export const handler = async () => {

 const interest_rate = 4.5

 return {
  statusCode: 200,
  body: JSON.stringify({
   system:"AI_MONETARY_POLICY",
   interest_rate,
   decision:"maintain stability",
   timestamp:new Date().toISOString()
  })
}
}
