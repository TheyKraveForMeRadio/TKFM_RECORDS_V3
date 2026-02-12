export async function handler(event) {
  const { fromLabel, toLabel, amount, currency } = JSON.parse(event.body);

  return {
    statusCode: 200,
    body: JSON.stringify({
      settlement_id: "CLR_" + Date.now(),
      fromLabel,
      toLabel,
      amount,
      currency: currency || "TKFM-CBDC",
      settled: true
    })
  };
}
