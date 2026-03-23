const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

module.exports = async () => {
  try {
    const base = process.env.SELF_BASE_URL

    await fetch(base + "/engine/spotify-streams-engine")
    await fetch(base + "/engine/youtube-revenue-engine")

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "oracle updated" })
    }

  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
