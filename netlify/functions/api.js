const { getEngine } = require("./_engine-loader")

exports.handler = async (event, context) => {

  const parts = event.path.split("/")
  const engineName = parts[parts.length - 1]

  const engine = getEngine(engineName)

  if (!engine) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: "engine not found",
        engine: engineName
      })
    }
  }

  return await engine(event, context)

}
