const fs = require("fs")
const path = require("path")

const enginesDir = path.join(__dirname, "../engines")

const registry = {}

function loadEngine(name) {

  try {

    const fileJS = path.join(enginesDir, name + ".js")
    const fileCJS = path.join(enginesDir, name + ".cjs")

    if (fs.existsSync(fileJS)) {
      registry[name] = require(fileJS)
      return registry[name]
    }

    if (fs.existsSync(fileCJS)) {
      registry[name] = require(fileCJS)
      return registry[name]
    }

  } catch (err) {

    console.warn("Engine failed to load:", name, err.message)

  }

  return null

}

function getEngine(name) {

  if (registry[name]) {
    return registry[name]
  }

  return loadEngine(name)

}

function listEngines() {

  return Object.keys(registry)

}

module.exports = {
  getEngine,
  listEngines
}
