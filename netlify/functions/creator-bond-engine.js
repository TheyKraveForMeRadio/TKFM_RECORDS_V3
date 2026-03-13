export const handler = async () => {

  try {

    return {
      statusCode: 200,
      body: JSON.stringify({
        engine: "creator-bond-engine",
        status: "online"
      })
    }

  } catch (err) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message
      })
    }

  }

}
