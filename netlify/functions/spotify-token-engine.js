const fetch = require("node-fetch");

let cachedToken = null;
let tokenExpiry = 0;

async function getSpotifyToken() {
  const now = Date.now();

  if (cachedToken && now < tokenExpiry) {
    return cachedToken;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
  });

  const data = await response.json();

  cachedToken = data.access_token;

  tokenExpiry = now + (data.expires_in - 60) * 1000;

  return cachedToken;
}

exports.handler = async function () {
  try {
    const token = await getSpotifyToken();

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "token_ready",
        expires_at: tokenExpiry
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message
      })
    };
  }
};

module.exports = { getSpotifyToken };
