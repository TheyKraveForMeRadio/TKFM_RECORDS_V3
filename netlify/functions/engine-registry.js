const fs = require("fs")
const path = require("path")

function resolveEnginesDir() {

  const localPath = path.join(__dirname, "../engines")
  const netlifyPath = path.join(process.cwd(), "netlify/engines")

  if (fs.existsSync(localPath)) return localPath
  if (fs.existsSync(netlifyPath)) return netlifyPath

  return localPath
}

const enginesDir = resolveEnginesDir()

function loadEngine(name) {

  try {

    const jsFile = path.join(enginesDir, name + ".js")
    const cjsFile = path.join(enginesDir, name + ".cjs")

    if (fs.existsSync(jsFile)) {
      return require(jsFile)
    }

    if (fs.existsSync(cjsFile)) {
      return require(cjsFile)
    }

  } catch (err) {

    console.warn("Engine load failed:", name, err.message)

  }

  return null
}

function getEngine(name) {
  return loadEngine(name)
}

module.exports = {
  getEngine
}
