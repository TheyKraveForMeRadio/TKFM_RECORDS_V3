export async function handler(event) {
  const { mode, target } = JSON.parse(event.body);

  return {
    statusCode: 200,
    body: JSON.stringify({
      override: mode,
      target,
      executed: true
    })
  };
}
