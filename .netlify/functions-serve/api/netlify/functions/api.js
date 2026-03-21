var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// netlify/functions/_engine-loader.js
var require_engine_loader = __commonJS({
  "netlify/functions/_engine-loader.js"(exports2, module2) {
    var path = require("path");
    var fs = require("fs");
    function getEngine2(name) {
      const base = path.join(process.cwd(), "netlify/engines");
      const jsPath = path.join(base, name + ".js");
      const cjsPath = path.join(base, name + ".cjs");
      try {
        let filePath = null;
        if (fs.existsSync(jsPath)) {
          filePath = jsPath;
        } else if (fs.existsSync(cjsPath)) {
          filePath = cjsPath;
        }
        if (!filePath) {
          throw new Error("engine file not found");
        }
        const mod = require(filePath);
        return mod.handler || mod.default || mod;
      } catch (err) {
        console.log("Engine load failed:", name, err.message);
        return null;
      }
    }
    module2.exports = { getEngine: getEngine2 };
  }
});

// netlify/functions/api.js
var { getEngine } = require_engine_loader();
exports.handler = async (event, context) => {
  const parts = event.path.split("/");
  const engineName = parts[parts.length - 1];
  const engine = getEngine(engineName);
  if (!engine) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: "engine not found",
        engine: engineName
      })
    };
  }
  return await engine(event, context);
};
//# sourceMappingURL=api.js.map
