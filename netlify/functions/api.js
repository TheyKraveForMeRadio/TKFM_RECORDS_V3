const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

/* engines directory (deployed path) */
const enginesDir = path.join(process.cwd(), "netlify", "engines");

/* engine cache */
const engineCache = {};

/* helper to pick handler from module */
function pickHandler(mod){
  if(!mod) return null;
  if(typeof mod === "function") return mod; // module.exports = async (...) => {}
  if(typeof mod.handler === "function") return mod.handler; // exports.handler = ...
  if(mod.default){
    if(typeof mod.default === "function") return mod.default;
    if(typeof mod.default.handler === "function") return mod.default.handler;
  }
  return null;
}

module.exports.handler = async (event, context) => {
  try {
    const endpoint = (event.path || "")
      .replace("/.netlify/functions/api/", "")
      .replace("/.netlify/functions/", "")
      .split("?")[0];

    const file = path.join(enginesDir, endpoint + ".js");

    if (!fs.existsSync(file)) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "engine not found", endpoint, path: file }),
      };
    }

    if (!engineCache[file]) {
      // Try CommonJS require first (fast)
      try {
        engineCache[file] = require(file);
      } catch (reqErr) {
        // If require fails because file is ESM (or uses `export`) then try dynamic import
        const msg = String(reqErr && reqErr.message ? reqErr.message : "");
        const isEsmError =
          reqErr && (reqErr.code === "ERR_REQUIRE_ESM" || msg.includes("Cannot use import statement") || msg.includes("Unexpected token"));

        if (isEsmError) {
          // dynamic import path needs file:// URL
          const fileUrl = pathToFileURL(file).href;
          const imported = await import(fileUrl);
          engineCache[file] = imported;
        } else {
          // unknown require error — rethrow so we can return it
          throw reqErr;
        }
      }
    }

    const mod = engineCache[file];
    const handler = pickHandler(mod);

    if (!handler) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "handler missing", endpoint, path: file }),
      };
    }

    // call handler and return result (allow handler to return APIGW-style response)
    return await handler(event, context);
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: String(err && err.message ? err.message : err) }),
    };
  }
};
