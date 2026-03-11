export function riskScore(catalog){

let score = 50

if(catalog.streamVolatility > 0.4) score += 20
if(catalog.ageYears < 1) score += 10
if(catalog.revenueTrend < 0) score += 15
if(catalog.platformConcentration > 0.7) score += 10

if(score > 100) score = 100

return score
}
