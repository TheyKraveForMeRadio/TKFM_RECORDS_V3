// netlify/functions/_engine-registry.js
var fs = require("fs");
var path = require("path");
var registry = {};
function loadEngines() {
  try {
    const enginesDir = path.join(__dirname, "../engines");
    const files = fs.readdirSync(enginesDir);
    for (const file of files) {
      if (!file.endsWith(".js") && !file.endsWith(".cjs")) continue;
      const name = file.replace(/\.js$|\.cjs$/, "");
      try {
        delete require.cache[require.resolve(path.join(enginesDir, file))];
        registry[name] = require(path.join(enginesDir, file));
      } catch (err) {
        console.warn("[engine-registry] failed to load", name, " \u2014 skipping. error:", err && err.message);
      }
    }
    console.log("[engine-registry] loaded engines:", Object.keys(registry).length);
  } catch (err) {
    console.error("[engine-registry] failed to initialize:", err && err.message);
  }
}
function getEngine(name) {
  return registry[name];
}
function listEngines() {
  return Object.keys(registry);
}
loadEngines();
module.exports = {
  loadEngines,
  getEngine,
  listEngines
};
//# sourceMappingURL=_engine-registry.js.map
