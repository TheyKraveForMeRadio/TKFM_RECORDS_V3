export async function handler() {

  const ARR = 600000;
  const multiple = 6;

  return {
    statusCode:200,
    body:JSON.stringify({
      ARR,
      valuation:ARR*multiple,
      method:"Revenue Multiple"
    })
  };
}
