const bus = require("./_event-bus.js")

exports.handler = async function(event) {

 try {

  return {
   statusCode: 200,
   body: JSON.stringify({
    status: "event-bus-placeholder",
    message: "Event bus operational"
   })
  }

 } catch (err) {

  return {
   statusCode: 500,
   body: JSON.stringify({
    error: err.message
   })
  }

 }

}
