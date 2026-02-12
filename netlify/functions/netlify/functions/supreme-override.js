export async function handler(event) {
  const { command } = JSON.parse(event.body);

  return {
    statusCode: 200,
    body: JSON.stringify({
      command,
      executed: true,
      authority: "ABSOLUTE"
    })
  };
}
