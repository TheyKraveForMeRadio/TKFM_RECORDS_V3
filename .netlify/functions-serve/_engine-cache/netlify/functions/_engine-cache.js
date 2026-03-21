// netlify/functions/_engine-cache.js
var cache = {};
function getEngine(name, loader) {
  if (!cache[name]) {
    cache[name] = loader();
  }
  return cache[name];
}
module.exports = { getEngine };
//# sourceMappingURL=_engine-cache.js.map
