export async function handler() {

  const factors = {
    GDPShock:-0.02,
    InterestRateChange:0.015,
    CreditSpreadWidening:0.03
  };

  const impact = {
    revenueImpact:1 + factors.GDPShock,
    fundingCostImpact:1 + factors.InterestRateChange,
    defaultImpact:1 + factors.CreditSpreadWidening
  };

  return {
    statusCode:200,
    body:JSON.stringify({
      factors,
      projectedImpact:impact
    })
  };
}
