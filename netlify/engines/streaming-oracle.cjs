const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);
const fetch = require("node-fetch");

// 🎧 SUPPORT MULTIPLE SOURCES
async function getSpotifyStreams(track_id){
  const res = await fetch(`https://api.spotify.com/v1/tracks/${track_id}`,{
    headers:{
      "Authorization":"Bearer " + process.env.SPOTIFY_ACCESS_TOKEN
    }
  });
  const data = await res.json();
  return data.popularity || 0; // proxy metric (Spotify doesn’t expose raw streams)
}

async function getAppleMusicStreams(track_id){
  const res = await fetch(`https://api.music.apple.com/v1/catalog/us/songs/${track_id}`,{
    headers:{
      "Authorization":"Bearer " + process.env.APPLE_MUSIC_TOKEN
    }
  });
  const data = await res.json();
  return (data.data && data.data[0]?.attributes?.playCount) || 0;
}

exports.handler = async () => {
  try{

    // 📦 LOAD ALL ACTIVE CATALOGS
    const catalogs = await redis.smembers("active:catalogs");

    let results = [];

    for(const catalog_id of catalogs){

      const spotify_id = await redis.get(`catalog:${catalog_id}:spotify`);
      const apple_id = await redis.get(`catalog:${catalog_id}:apple`);

      let streams = 0;

      if(spotify_id){
        streams += await getSpotifyStreams(spotify_id);
      }

      if(apple_id){
        streams += await getAppleMusicStreams(apple_id);
      }

      // 💰 SIMPLE REVENUE MODEL
      const revenue = streams * 0.003; // avg per stream

      // 📊 STORE SNAPSHOT
      await redis.lpush(`streams:${catalog_id}`, JSON.stringify({
        streams,
        revenue,
        timestamp:Date.now()
      }));

      // 🔥 TRIGGER DISTRIBUTION
      await fetch(process.env.REVENUE_DISTRIBUTION_URL || "https://tkfm-records-v3.onrender.com/engine/share-revenue-distribution", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({
          catalog_id,
          revenue
        })
      });

      results.push({ catalog_id, streams, revenue });

    }

    return {
      statusCode:200,
      body:JSON.stringify({
        success:true,
        results
      })
    };

  }catch(err){
    return {
      statusCode:500,
      body:JSON.stringify({ error: err.message })
    };
  }
};
