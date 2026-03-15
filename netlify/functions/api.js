const path = require("path")

const cache = {}

exports.handler = async function(event, context) {

 const engineName = event.path.split("/api/")[1]

 if (!engineName) {
  return {
   statusCode: 400,
   body: JSON.stringify({ error: "engine not specified" })
  }
 }

 try {

  if (!cache[engineName]) {

   const enginePath = path.join(
    __dirname,
    "..",
    "engines",
    engineName + ".js"
   )

   cache[engineName] = require(enginePath)

  }

  const engine =
   cache[engineName].handler ||
   cache[engineName]

  return await engine(event, context)

 } catch (err) {

  return {
   statusCode: 500,
   body: JSON.stringify({
    engine: engineName,
    error: err.message
   })
  }

 }

}
