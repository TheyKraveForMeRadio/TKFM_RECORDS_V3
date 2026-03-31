const engine = require("./get-orderbook-engine.cjs");

exports.handler = async (event, context) => {
  return await engine.handler(event, context);
};
