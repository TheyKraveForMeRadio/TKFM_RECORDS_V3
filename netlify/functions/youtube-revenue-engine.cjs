const fetch = require("node-fetch")
const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

const API_KEY = process.env.YOUTUBE_API_KEY

module.exports = async () => {
  try {
    const assets = await redis.lrange("assets", 0, -1)

    for (let a of assets){
      const asset = JSON.parse(a)

      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(asset.title)}&key=${API_KEY}&maxResults=1`
      )

      const data = await res.json()
      const video = data.items?.[0]

      if(!video) continue

      const videoId = video.id.videoId

      const statsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`
      )

      const stats = await statsRes.json()
      const views = parseInt(stats.items?.[0]?.statistics?.viewCount || 0)

      // 💰 estimate revenue ($0.002 per view approx)
      const revenue = views * 0.002

      await redis.incrbyfloat(`revenue:${asset.id}`, revenue)
    }

    return {
      statusCode:200,
      body: JSON.stringify({ status:"youtube revenue updated" })
    }

  } catch(err){
    return {
      statusCode:500,
      body: err.message
    }
  }
}
