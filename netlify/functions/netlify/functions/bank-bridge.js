export async function handler(event) {
  const { institution, amount } = JSON.parse(event.body);

  return {
    statusCode: 200,
    body: JSON.stringify({
      institution,
      amount,
      status: "AUTHORIZED",
      settlement_window: "T+0"
    })
  };
}
