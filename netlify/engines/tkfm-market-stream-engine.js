exports.handler = async function(event) {

 return {
  statusCode: 200,
  headers: {
   "Content-Type": "text/event-stream",
   "Cache-Control": "no-cache",
   "Connection": "keep-alive"
  },
  body:
   "data: " +
   JSON.stringify({
    price: (Math.random() * 10).toFixed(2),
    catalog_id: "song123",
    time: Date.now()
   }) +
   "\n\n"
 };

};
