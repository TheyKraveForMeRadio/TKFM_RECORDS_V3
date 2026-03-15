const fs = require("fs")
const path = require("path")

/* ENGINE REGISTRY CACHE */

const registry = {}

function loadEngines() {

  const dir = path.join(__dirname, "../engines")

  const files = fs.readdirSync(dir)

  for (const file of files) {

    if (file.endsWith(".js")) {

      const name = file.replace(".js","")

      registry[name] = require(path.join(dir,file))

    }

  }

}

/* LOAD ONCE */

loadEngines()

exports.handler = async function(event, context) {

  const engineName = event.path.split("/api/")[1]

  const engine = registry[engineName]

  if (!engine) {

    return {
      statusCode: 404,
      body: JSON.stringify({
        error: "engine not found"
      })
    }

  }

  return await engine.handler(event, context)

}
