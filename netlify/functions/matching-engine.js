const engine = require("./matching-engine.cjs");

exports.handler = async (event, context) => {
  return await engine.handler(event, context);
};
