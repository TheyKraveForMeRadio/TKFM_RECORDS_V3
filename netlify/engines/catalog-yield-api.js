export const handler = async () => {

 const res = await fetch(
  process.env.URL + "/.netlify/functions/api/royalty-yield-engine"
 )

 const data = await res.json()

 return {
  statusCode:200,
  body:JSON.stringify(data)
 }
}
