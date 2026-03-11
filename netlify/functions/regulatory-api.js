import { handler as car } from './capital-adequacy.js';
import { handler as lcr } from './liquidity-coverage.js';
import { handler as nsfr } from './nsfr.js';

export async function handler() {

  const carData = JSON.parse((await car()).body);
  const lcrData = JSON.parse((await lcr()).body);
  const nsfrData = JSON.parse((await nsfr()).body);

  return {
    statusCode:200,
    body:JSON.stringify({
      capitalAdequacy:carData,
      liquidityCoverage:lcrData,
      netStableFunding:nsfrData,
      generated:new Date().toISOString()
    })
  };
}
