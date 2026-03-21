const { getRedis } = require("../functions/_redis")

module.exports = async (event) => {

  try {

    const redis = getRedis()

    const params = event.queryStringParameters || {}
    const catalog_id = params.catalog_id

    if (!catalog_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "catalog_id required"
        })
      }
    }

    const data = await redis.get(`price:${catalog_id}`)

    return {
      statusCode: 200,
      body: JSON.stringify({
        catalog_id,
        price: data ? JSON.parse(data) : null
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
