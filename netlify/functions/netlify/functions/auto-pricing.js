export async function handler(event) {
  const { email, projectedRevenue } = JSON.parse(event.body);

  let newPlan = "monthly_basic";
  if (projectedRevenue >= 250) newPlan = "monthly_premium";
  if (projectedRevenue >= 500) newPlan = "elite_label";

  return {
    statusCode: 200,
    body: JSON.stringify({
      email,
      upgrade_to: newPlan,
      action: "READY_FOR_STRIPE_SWAP"
    })
  };
}
