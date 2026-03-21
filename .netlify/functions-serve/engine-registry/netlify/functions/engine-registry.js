// netlify/functions/engine-registry.js
var fs = require("fs");
var path = require("path");
var cache = {};
function candidateDirs() {
  const dirs = [];
  dirs.push(path.join(__dirname, "../engines"));
  dirs.push(path.join(process.cwd(), "netlify/engines"));
  dirs.push(path.join(process.cwd(), "engines"));
  dirs.push("/var/task/netlify/engines");
  dirs.push("/var/task/engines");
  dirs.push(path.join(__dirname, "../../engines"));
  dirs.push(path.join(__dirname, "../../../engines"));
  const seen = /* @__PURE__ */ new Set();
  return dirs.filter((d) => {
    if (seen.has(d)) return false;
    seen.add(d);
    return fs.existsSync(d);
  });
}
function requireFrom(dir, name) {
  try {
    const js = path.join(dir, name + ".js");
    const cjs = path.join(dir, name + ".cjs");
    if (fs.existsSync(js)) {
      try {
        delete require.cache[require.resolve(js)];
      } catch (e) {
      }
      return require(js);
    }
    if (fs.existsSync(cjs)) {
      try {
        delete require.cache[require.resolve(cjs)];
      } catch (e) {
      }
      return require(cjs);
    }
  } catch (err) {
  }
  return null;
}
function tryRequireEngine(name) {
  if (cache[name]) return cache[name];
  const dirs = candidateDirs();
  for (const d of dirs) {
    const mod = requireFrom(d, name);
    if (mod) {
      cache[name] = mod;
      return mod;
    }
  }
  try {
    const fallback = path.join(__dirname, "../engines", name + ".js");
    if (fs.existsSync(fallback)) {
      try {
        delete require.cache[require.resolve(fallback)];
      } catch (e) {
      }
      const m = require(fallback);
      cache[name] = m;
      return m;
    }
  } catch (err) {
  }
  return null;
}
function getEngine(name) {
  if (cache[name]) return cache[name];
  return tryRequireEngine(name);
}
module.exports = {
  getEngine,
  tryRequireEngine,
  _candidateDirs: candidateDirs
  // exported for diagnostics if needed
};
//# sourceMappingURL=engine-registry.js.map
