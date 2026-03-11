export function forecastRoyalty(history){

const growthRates = []

for(let i=1;i<history.length;i++){
  const g = (history[i]-history[i-1]) / history[i-1]
  growthRates.push(g)
}

const avgGrowth =
growthRates.reduce((a,b)=>a+b,0) /
growthRates.length

const last = history[history.length-1]

const nextYear = last * (1 + avgGrowth)

return {
  growthRate: avgGrowth,
  projectedRevenue: nextYear
}

}
