const path = require("path")

const engineCache = {}

exports.handler = async function(event, context) {

 const engineName = event.path.split("/api/")[1]

 if (!engineName) {
  return {
   statusCode: 400,
   body: JSON.stringify({ error: "engine not specified" })
  }
 }

 try {

  if (!engineCache[engineName]) {

   const enginePath = path.resolve(
    "./netlify/engines/" + engineName + ".js"
   )

   engineCache[engineName] = require(enginePath)

  }

  const engine =
   engineCache[engineName].handler ||
   engineCache[engineName]

  return await engine(event, context)

 } catch (err) {

  return {
   statusCode: 500,
   body: JSON.stringify({
    error: err.message,
    engine: engineName
   })
  }

 }

}
