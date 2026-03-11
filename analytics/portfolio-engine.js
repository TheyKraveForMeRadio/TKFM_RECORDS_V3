export function analyzePortfolio(pools){

let totalValue = 0
let totalRevenue = 0

pools.forEach(p=>{
  totalValue += p.deposits
  totalRevenue += p.revenue
})

const avgYield = totalRevenue / totalValue

return {
  totalValue,
  totalRevenue,
  avgYield
}

}
