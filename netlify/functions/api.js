const { loadEngines, getEngine } = require("./engine-registry")

// load on startup
loadEngines()

exports.handler = async function(event, context) {
  const engineName = (event.path || "").split("/api/")[1]
  if (!engineName) {
    return { statusCode: 400, body: JSON.stringify({ error: "engine not specified" }) }
  }

  try {
    const engine = getEngine(engineName)
    if (!engine) {
      return { statusCode: 404, body: JSON.stringify({ error: "engine not found", engine: engineName }) }
    }
    return await engine.handler(event, context)
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ engine: engineName, error: err && err.message }) }
  }
}
