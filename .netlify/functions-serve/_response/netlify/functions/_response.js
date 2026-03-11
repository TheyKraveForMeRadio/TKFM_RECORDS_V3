var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// netlify/functions/_response.js
var response_exports = {};
__export(response_exports, {
  failure: () => failure,
  success: () => success
});
module.exports = __toCommonJS(response_exports);
function success(data = {}) {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: true, data })
  };
}
function failure(message = "Server error", code = 400) {
  return {
    statusCode: code,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: false, error: message })
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  failure,
  success
});
//# sourceMappingURL=_response.js.map
