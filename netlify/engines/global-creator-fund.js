import bus from "./_event-bus.js";
export const handler = async () => {

  try {

    return {
      statusCode: 200,
      body: JSON.stringify({
        engine: "global-creator-fund",
        status: "active"
      })
    }

  } catch (err) {

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    }

  }

}
