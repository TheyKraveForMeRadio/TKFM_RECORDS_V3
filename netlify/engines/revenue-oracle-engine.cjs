const https = require("https")

function hit(url){
  return new Promise((resolve, reject)=>{
    https.get(url, res=>{
      let data = ""
      res.on("data", chunk => data += chunk)
      res.on("end", ()=> resolve(data))
    }).on("error", reject)
  })
}

module.exports = async () => {
  try {
    const base = process.env.SELF_BASE_URL

    await hit(base + "/engine/spotify-streams-engine")
    await hit(base + "/engine/youtube-revenue-engine")

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
