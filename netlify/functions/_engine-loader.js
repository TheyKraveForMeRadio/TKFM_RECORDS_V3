const path = require("path")
const fs = require("fs")

function getEngine(name) {

  const base = path.join(process.cwd(), "netlify/engines")

  const jsPath = path.join(base, name + ".js")
  const cjsPath = path.join(base, name + ".cjs")

  try {

    let filePath = null

    if (fs.existsSync(jsPath)) {
      filePath = jsPath
    } else if (fs.existsSync(cjsPath)) {
      filePath = cjsPath
    }

    if (!filePath) {
      throw new Error("engine file not found")
    }

    const mod = require(filePath)

    return mod.handler || mod.default || mod

  } catch (err) {

    console.log("Engine load failed:", name, err.message)
    return null

  }

}

module.exports = { getEngine }
