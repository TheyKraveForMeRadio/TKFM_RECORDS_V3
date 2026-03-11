
export async function handler() {

  const ARR = 1500000;
  const multiple = 6;

  const valuation = ARR * multiple;

  return {
    statusCode:200,
    body:JSON.stringify({
      ARR,
      multiple,
      estimatedValuation: valuation
    })
  };
}
