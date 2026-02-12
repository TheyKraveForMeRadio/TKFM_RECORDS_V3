let CITIZENS = [];

export async function handler(event) {
  const { email, name } = JSON.parse(event.body);

  const citizen = {
    id: "TKFM-CIT-" + Date.now(),
    email,
    name,
    status: "ACTIVE",
    rights: [
      "CREATE",
      "EARN",
      "VOTE",
      "DISTRIBUTE",
      "GOVERN"
    ]
  };

  CITIZENS.push(citizen);

  return {
    statusCode: 200,
    body: JSON.stringify(citizen)
  };
}
