export async function handler(event) {
  const { city, ownerEmail } = JSON.parse(event.body);

  const nodeId = `TKFM_${city.toUpperCase()}`;

  return {
    statusCode: 200,
    body: JSON.stringify({
      nodeId,
      ownerEmail,
      permissions: ["sign_artists", "run_radio", "earn_split"],
      status: "ACTIVE"
    })
  };
}
