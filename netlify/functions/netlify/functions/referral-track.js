let REFERRALS = {};

export async function handler(event) {
  const { referrer, newArtist } = JSON.parse(event.body);

  if (!REFERRALS[referrer]) REFERRALS[referrer] = [];

  REFERRALS[referrer].push({
    artist: newArtist,
    joined_at: Date.now()
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      referrer,
      totalReferred: REFERRALS[referrer].length,
      reward: "credits_awarded"
    })
  };
}
