const fs = require("fs")
const path = require("path")

const registry = {}

function loadEngines() {

  const enginesDir = path.join(__dirname, "../engines")

  const files = fs.readdirSync(enginesDir)

  for (const file of files) {

    if (!file.endsWith(".js") && !file.endsWith(".cjs")) continue

    const name = file.replace(".js","").replace(".cjs","")

    try {

      registry[name] = require(path.join(enginesDir, file))

    } catch (err) {

      console.warn("Engine failed to load:", name)

    }

  }

  console.log("Engine Registry Loaded:", Object.keys(registry).length)

}

function getEngine(name) {
  return registry[name]
}

module.exports = {
  loadEngines,
  getEngine
}
