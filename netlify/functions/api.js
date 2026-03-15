const path = require('path')
let registry = null
try {
  registry = require('./engine-registry')
} catch (err) {
  registry = null
}

// helper: try registry then dynamic require via registry.tryRequireEngine
async function resolveEngine(name) {
  try {
    if (registry && registry.getEngine) {
      const e = registry.getEngine(name)
      if (e) return e
    }
  } catch (err) {
    // ignore
  }

  try {
    if (registry && registry.tryRequireEngine) {
      return registry.tryRequireEngine(name)
    }
  } catch (err) {
    // ignore
  }

  // final fallback - attempt simple require paths
  const fs = require('fs')
  const tryPaths = [
    path.join(__dirname, '../engines', name + '.js'),
    path.join(process.cwd(), 'netlify/engines', name + '.js'),
    path.join(process.cwd(), 'engines', name + '.js'),
    path.join('/var/task/netlify/engines', name + '.js'),
    path.join('/var/task/engines', name + '.js')
  ]
  for (const p of tryPaths) {
    try {
      if (fs.existsSync(p)) {
        try { delete require.cache[require.resolve(p)] } catch(e){}
        return require(p)
      }
    } catch(e){}
  }

  return null
}

exports.handler = async function(event, context) {
  try {
    const engineName = (event.path || '').split('/api/')[1]
    if (!engineName) {
      return { statusCode: 400, body: JSON.stringify({ error: 'engine not specified' }) }
    }

    const engine = await resolveEngine(engineName)

    if (!engine || !engine.handler) {
      return { statusCode: 404, body: JSON.stringify({ error: 'engine not found', engine: engineName }) }
    }

    return await engine.handler(event, context)
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err && err.message }) }
  }
}
