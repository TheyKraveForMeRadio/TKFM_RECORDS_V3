const { loadEngines, getEngine } = require("./_engine-registry")

/* LOAD ENGINES ON STARTUP */

loadEngines()

exports.handler = async function(event, context) {

  const engineName = event.path.split("/api/")[1]

  if (!engineName) {

    return {
      statusCode: 400,
      body: JSON.stringify({ error: "engine not specified" })
    }

  }

  const engine = getEngine(engineName)

  if (!engine) {

    return {
      statusCode: 404,
      body: JSON.stringify({ error: "engine not found" })
    }

  }

  return await engine.handler(event, context)

}
