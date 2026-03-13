export const handler = async () => {

  try {

    return {
      statusCode: 200,
      body: JSON.stringify({
        engine: "global-royalty-clearing",
        status: "running"
      })
    }

  } catch (err) {

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    }

  }

}
