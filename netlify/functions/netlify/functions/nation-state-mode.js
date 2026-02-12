let MODE = "INDEPENDENT";

export async function handler(event) {
  const { enable } = JSON.parse(event.body);

  MODE = enable ? "NATION_STATE" : "INDEPENDENT";

  return {
    statusCode: 200,
    body: JSON.stringify({
      mode: MODE,
      powers: enable
        ? ["taxation", "currency", "cultural_policy"]
        : ["media_only"]
    })
  };
}
