let MEMORY = [];

export async function handler(event) {
  const data = JSON.parse(event.body);
  MEMORY.push({ ...data, timestamp: Date.now() });

  return {
    statusCode: 200,
    body: JSON.stringify({
      memory_size: MEMORY.length,
      status: "EVOLVING"
    })
  };
}
