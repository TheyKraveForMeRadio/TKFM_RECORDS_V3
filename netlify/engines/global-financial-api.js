import bus from "./_event-bus.js";
export const handler = async () => {

  try {

    return {
      statusCode: 200,
      body: JSON.stringify({
        service: "global-financial-api",
        status: "online"
      })
    }

  } catch (err) {

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    }

  }

}
