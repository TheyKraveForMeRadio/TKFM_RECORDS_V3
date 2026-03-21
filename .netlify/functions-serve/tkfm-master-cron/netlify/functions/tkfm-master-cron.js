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

// netlify/functions/tkfm-master-cron.js
var tkfm_master_cron_exports = {};
__export(tkfm_master_cron_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(tkfm_master_cron_exports);
var BASE = process.env.SELF_BASE_URL || "https://tkfmrecords.com";
async function call(fn) {
  try {
    await fetch(BASE + "/.netlify/functions/api/" + fn);
  } catch (e) {
    console.log("cron error", fn, e);
  }
}
var handler = async () => {
  const minute = (/* @__PURE__ */ new Date()).getMinutes();
  await Promise.all([
    call("trade-queue-worker"),
    call("matching-engine"),
    call("market-maker-ai"),
    call("market-maker-orders"),
    call("catalog-price-oracle"),
    call("ai-market-maker-engine"),
    call("market-surveillance-engine"),
    call("trade-risk-engine"),
    call("global-clearinghouse-engine")
  ]);
  if (minute % 5 === 0) {
    await Promise.all([
      call("catalog-price-history"),
      call("record-catalog-price"),
      call("live-catalog-price"),
      call("platform-growth-engine")
    ]);
  }
  if (minute % 10 === 0) {
    await Promise.all([
      call("distribution-router"),
      call("deliver-to-platforms"),
      call("fan-invest-catalog"),
      call("buy-catalog-shares")
    ]);
  }
  if (minute % 30 === 0) {
    await Promise.all([
      call("spotify-royalty-sync"),
      call("streaming-revenue-oracle")
    ]);
  }
  if (minute === 0) {
    await Promise.all([
      call("music-index-engine"),
      call("music-etf-engine"),
      call("music-derivatives-engine"),
      call("music-derivatives-clearing-engine"),
      call("music-derivatives-margin-engine"),
      call("trending-index-engine"),
      call("music-economy-simulator-engine"),
      call("music-central-bank-engine"),
      call("tkfm-ai-governor-engine"),
      call("regulatory-compliance-engine"),
      call("global-regulatory-engine"),
      call("tkfm-global-liquidity-router"),
      call("tkfm-node-network-engine")
    ]);
  }
  return {
    statusCode: 200,
    body: "TKFM master cron executed"
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=tkfm-master-cron.js.map
