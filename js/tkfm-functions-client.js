/*
TKFM FUNCTIONS CLIENT
Universal client for calling Netlify Functions
Used by frontend to interact with backend engines
*/

const TKFM_FUNCTION_BASE = "/.netlify/functions"

/* ---------------------------------------------------
GENERIC FUNCTION CALL
--------------------------------------------------- */

export async function tkfmFunction(name, payload = {}) {

const res = await fetch(`${TKFM_FUNCTION_BASE}/${name}`, {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(payload)
})

if (!res.ok) {
throw new Error(`Function ${name} failed`)
}

return res.json()
}

/* ---------------------------------------------------
CATALOG SHARE PURCHASE
--------------------------------------------------- */

export async function buyCatalogShares(data) {

return tkfmFunction("create-song-investment-checkout", data)

}

/* ---------------------------------------------------
ROYALTY DISTRIBUTION
--------------------------------------------------- */

export async function distributeRoyalties(data) {

return tkfmFunction("distribute-royalties", data)

}

/* ---------------------------------------------------
TRADE EXECUTION
--------------------------------------------------- */

export async function executeTrade(data) {

return tkfmFunction("execute-trade", data)

}

/* ---------------------------------------------------
LEDGER VIEW
--------------------------------------------------- */

export async function getLedger(entityId) {

return tkfmFunction("payment-ledger", {
entity_id: entityId
})

}

/* ---------------------------------------------------
INVESTOR PORTFOLIO
--------------------------------------------------- */

export async function getInvestorPortfolio(investorId) {

return tkfmFunction("investor-portfolio-engine", {
investor_id: investorId
})

}

/* ---------------------------------------------------
CATALOG MARKET DATA
--------------------------------------------------- */

export async function getCatalogMarket() {

return tkfmFunction("catalog-market-data")

}

