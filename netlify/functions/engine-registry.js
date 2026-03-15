const fs = require('fs')
const path = require('path')

/**
 * Engine registry with multi-path resolution and dynamic require.
 * Exports:
 *  - getEngine(name)       -> returns loaded engine module or null
 *  - tryRequireEngine(name) -> attempts to require the engine from many possible paths and returns module or null
 */

const cache = {}

function candidateDirs() {
  // possible locations where Netlify or local dev may place engines
  const dirs = []

  // relative to this file (local dev)
  dirs.push(path.join(__dirname, '../engines'))
  // sometimes the bundle extracts to process.cwd()/netlify/engines
  dirs.push(path.join(process.cwd(), 'netlify/engines'))
  // sometimes bundle extracts to process.cwd()/engines
  dirs.push(path.join(process.cwd(), 'engines'))
  // absolute /var/task variants used in some runtimes
  dirs.push('/var/task/netlify/engines')
  dirs.push('/var/task/engines')
  // a couple more safe fallbacks
  dirs.push(path.join(__dirname, '../../engines'))
  dirs.push(path.join(__dirname, '../../../engines'))

  // dedupe and only include those that exist
  const seen = new Set()
  return dirs.filter(d => {
    if (seen.has(d)) return false
    seen.add(d)
    return fs.existsSync(d)
  })
}

function requireFrom(dir, name) {
  try {
    const js = path.join(dir, name + '.js')
    const cjs = path.join(dir, name + '.cjs')
    if (fs.existsSync(js)) {
      // clear cache to allow hot reloads
      try { delete require.cache[require.resolve(js)] } catch(e){}
      return require(js)
    }
    if (fs.existsSync(cjs)) {
      try { delete require.cache[require.resolve(cjs)] } catch(e){}
      return require(cjs)
    }
  } catch (err) {
    // swallow errors, caller will handle
  }
  return null
}

function tryRequireEngine(name) {
  // first check cache
  if (cache[name]) return cache[name]

  const dirs = candidateDirs()
  for (const d of dirs) {
    const mod = requireFrom(d, name)
    if (mod) {
      cache[name] = mod
      return mod
    }
  }

  // last-ditch: try relative ../engines (if candidateDirs missed it)
  try {
    const fallback = path.join(__dirname, '../engines', name + '.js')
    if (fs.existsSync(fallback)) {
      try { delete require.cache[require.resolve(fallback)] } catch(e){}
      const m = require(fallback)
      cache[name] = m
      return m
    }
  } catch (err) {}

  return null
}

function getEngine(name) {
  if (cache[name]) return cache[name]
  // do NOT throw — return null if not present
  return tryRequireEngine(name)
}

module.exports = {
  getEngine,
  tryRequireEngine,
  _candidateDirs: candidateDirs // exported for diagnostics if needed
}
