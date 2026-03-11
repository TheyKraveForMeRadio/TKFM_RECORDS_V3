export async function handler() {

  const treasuryPool = 1000000; // placeholder
  const yieldRates = [0.02,0.03,0.04];

  const scenarios = yieldRates.map(rate => {
    const annualReturn = treasuryPool * rate;
    return {
      yieldRate:rate,
      annualReturn
    };
  });

  return {
    statusCode:200,
    body:JSON.stringify({
      treasuryPool,
      scenarios
    })
  };
}
