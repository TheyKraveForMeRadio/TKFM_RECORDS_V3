
export async function handler() {

  let liquidity = 1000000;
  let assetPrice = 100;
  let shock = 0.2;

  for (let i = 0; i < 10; i++) {

    liquidity *= (1 - shock);

    assetPrice *= (1 - shock * 0.5);

    shock *= 0.8;
  }

  return {
    statusCode:200,
    body:JSON.stringify({
      finalLiquidity:liquidity,
      finalAssetPrice:assetPrice
    })
  };
}
