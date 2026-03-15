const fs = require('fs')
const path = require('path')

const registry = {}

/**
 * Load all .js/.cjs engines in netlify/engines into memory.
 * Engines that fail to load are skipped (logged) to avoid crashing the gateway.
 */
function loadEngines() {
  try {
    const enginesDir = path.join(__dirname, '../engines')
    const files = fs.readdirSync(enginesDir)

    for (const file of files) {
      if (!file.endsWith('.js') && !file.endsWith('.cjs')) continue

      const name = file.replace(/\.js$|\.cjs$/,'')
      try {
        // clear require cache for a predictable load during dev (harmless in lambda)
        delete require.cache[require.resolve(path.join(enginesDir, file))]
        registry[name] = require(path.join(enginesDir, file))
      } catch (err) {
        // Log and skip any engine that can't be required (ESM syntax, runtime error, etc.)
        console.warn('[engine-registry] failed to load', name, ' — skipping. error:', err && err.message)
      }
    }

    console.log('[engine-registry] loaded engines:', Object.keys(registry).length)
  } catch (err) {
    console.error('[engine-registry] failed to initialize:', err && err.message)
  }
}

function getEngine(name) {
  return registry[name]
}

function listEngines() {
  return Object.keys(registry)
}

// initialize on module load
loadEngines()

module.exports = {
  loadEngines,
  getEngine,
  listEngines
}
