const fs = require("fs")
const path = require("path")

const engines = {}

function loadEngines() {

  const enginesDir = path.join(process.cwd(), "netlify", "engines")

  const files = fs.readdirSync(enginesDir)

  files.forEach(file => {

    if (!file.endsWith(".js")) return

    try {

      const enginePath = path.join(enginesDir, file)

      const engine = require(enginePath)

      const handler =
        engine.handler ||
        engine.default ||
        engine

      if (typeof handler === "function") {

        const name = file.replace(".js","")

        engines[name] = handler

        console.log("Loaded engine:", name)

      } else {

        console.log("Skipped engine:", file)

      }

    } catch(err) {

      console.log("Engine failed to load:", file, err.message)

    }

  })

}

loadEngines()

module.exports = { engines }
