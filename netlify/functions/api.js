const path = require("path");

const cache = {};

exports.handler = async function (event, context) {

  const engine = event.path.split("/api/")[1];

  if (!engine) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No engine specified" })
    };
  }

  try {

    if (!cache[engine]) {

      const enginePath = path.resolve(
        "./netlify/engines/" + engine + ".js"
      );

      cache[engine] = require(enginePath);

    }

    const engineHandler =
      cache[engine].handler || cache[engine];

    return await engineHandler(event, context);

  } catch (err) {

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };

  }

};
