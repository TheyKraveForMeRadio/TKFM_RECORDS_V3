const fetch = require("node-fetch")
const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET

async function getToken(){
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method:"POST",
    headers:{
      "Authorization":"Basic " + Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
      "Content-Type":"application/x-www-form-urlencoded"
    },
    body:"grant_type=client_credentials"
  })
  const data = await res.json()
  return data.access_token
}

module.exports = async () => {
  try {
    const token = await getToken()

    const assets = await redis.lrange("assets", 0, -1)

    for (let a of assets){
      const asset = JSON.parse(a)

      // 🔎 search track
      const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(asset.title)}&type=track&limit=1`, {
        headers:{ Authorization:"Bearer " + token }
      })

      const data = await res.json()

      const track = data.tracks?.items?.[0]
      if(!track) continue

      const popularity = track.popularity || 0

      // 💰 estimate revenue
      const revenue = popularity * 0.02

      await redis.incrbyfloat(`revenue:${asset.id}`, revenue)
    }

    return {
      statusCode:200,
      body: JSON.stringify({ status:"spotify revenue updated" })
    }

  } catch(err){
    return {
      statusCode:500,
      body: err.message
    }
  }
}
