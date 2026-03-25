const engine = require("./market-loop-engine.cjs");

exports.handler = async (event, context) => {
  return await engine.handler(event, context);
};
