/**
 * API Gateway with engine-registry + direct-require fallback
 * - uses ./engine-registry.getEngine(name)
 * - if that returns null, attempts to require('../engines/<name>.js') at runtime
 * This prevents "engine not found" when new engine files appear (no redeploy required).
 */

const path = require("path")

let registry
try {
  registry = require("./engine-registry")
} catch (err) {
  // registry might be absent in some bundles; create a minimal loader fallback
  registry = {
    getEngine: (name) => null,
    listEngines: () => []
  }
}

function tryRequireEngine(name) {
  try {
    const enginesDir = path.join(__dirname, "../engines")
    const jsPath = path.join(enginesDir, name + ".js")
    const cjsPath = path.join(enginesDir, name + ".cjs")
    try {
      if (require('fs').existsSync(jsPath)) {
        // clear cache to ensure fresh load
        delete require.cache[require.resolve(jsPath)]
        return require(jsPath)
      }
    } catch(e){}
    try {
      if (require('fs').existsSync(cjsPath)) {
        delete require.cache[require.resolve(cjsPath)]
        return require(cjsPath)
      }
    } catch(e){}
  } catch (err) {
    // ignore
  }
  return null
}

exports.handler = async function(event, context) {

  try {

    const engineName = (event.path || "").split("/api/")[1]

    if (!engineName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "engine not specified" })
      }
    }

    // 1) Try registry
    let engine = null
    try {
      engine = registry && registry.getEngine ? registry.getEngine(engineName) : null
    } catch (err) {
      engine = null
    }

    // 2) Fallback: attempt to require the engine file directly (hot-load)
    if (!engine) {
      engine = tryRequireEngine(engineName)
    }

    if (!engine || !engine.handler) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: "engine not found",
          engine: engineName
        })
      }
    }

    // delegate to engine handler
    return await engine.handler(event, context)

  } catch (err) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err && err.message
      })
    }

  }

}
