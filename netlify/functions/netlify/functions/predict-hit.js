export async function handler(event) {
  const { trackName, artistEmail } = JSON.parse(event.body);

  // Example: AI prediction (stubbed with random for now)
  const score = Math.min(1, Math.random() + 0.3); // 0.3–1.3 normalized to 0–1
  const prediction = score > 0.7 ? "HIGH_HIT_POTENTIAL" : "MODERATE";

  return {
    statusCode: 200,
    body: JSON.stringify({ trackName, artistEmail, prediction, score })
  };
}
