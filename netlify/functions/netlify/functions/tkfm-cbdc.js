let LEDGER = {};
let SUPPLY = 0;

export async function handler(event) {
  const { action, account, amount } = JSON.parse(event.body);

  if (action === "mint") {
    LEDGER[account] = (LEDGER[account] || 0) + amount;
    SUPPLY += amount;
  }

  if (action === "transfer") {
    const { to } = JSON.parse(event.body);
    if ((LEDGER[account] || 0) < amount) {
      return { statusCode: 400, body: "INSUFFICIENT_FUNDS" };
    }
    LEDGER[account] -= amount;
    LEDGER[to] = (LEDGER[to] || 0) + amount;
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ supply: SUPPLY, ledger: LEDGER })
  };
}
