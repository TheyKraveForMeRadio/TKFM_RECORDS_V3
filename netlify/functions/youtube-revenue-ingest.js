const fetch = require("node-fetch");
const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function fetchVideoStats(videoId) {
  const url =
    "https://www.googleapis.com/youtube/v3/videos" +
    "?part=statistics" +
    "&id=" +
    videoId +
    "&key=" +
    YOUTUBE_API_KEY;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.items || data.items.length === 0) {
    return null;
  }

  const stats = data.items[0].statistics;

  return {
    views: parseInt(stats.viewCount || "0"),
    likes: parseInt(stats.likeCount || "0"),
    comments: parseInt(stats.commentCount || "0"),
  };
}

function estimateRevenue(views) {
  const CPM = 0.003; // conservative estimate
  return views * CPM;
}

exports.handler = async function () {
  try {
    const { data: catalogs, error } = await supabase
      .from("catalogs")
      .select("id, artist_id, youtube_video_id");

    if (error) {
      throw error;
    }

    const results = [];

    for (const catalog of catalogs) {
      if (!catalog.youtube_video_id) continue;

      const stats = await fetchVideoStats(catalog.youtube_video_id);

      if (!stats) continue;

      const revenue = estimateRevenue(stats.views);

      const event = {
        platform: "youtube",
        catalog_id: catalog.id,
        artist_id: catalog.artist_id,
        track_id: catalog.youtube_video_id,
        plays: stats.views,
        revenue_usd: revenue,
        country: "global",
        timestamp: new Date().toISOString(),
        source_file: "youtube_api",
      };

      await supabase.from("streaming_revenue_events").insert(event);

      await supabase.rpc("increment_catalog_revenue", {
        catalog_id_input: catalog.id,
        revenue_input: revenue,
        streams_input: stats.views,
      });

      results.push({
        catalog: catalog.id,
        views: stats.views,
        revenue: revenue,
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "youtube_ingestion_complete",
        processed: results.length,
        results,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};
