exports.handler = async function(event) {

 const payload = {
  catalog_id: "song123",
  price: (Math.random()*10).toFixed(2),
  volume: Math.floor(Math.random()*10)+1,
  time: Date.now()
 }

 return {
  statusCode: 200,
  headers: {
   "Content-Type":"application/json"
  },
  body: JSON.stringify(payload)
 }

}
