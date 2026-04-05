/*
TKFM FINANCIAL API CLIENT
Connects frontend dashboards to financial engines
*/

const BASE = "/.netlify/functions"

/* -------------------------------
FINANCIAL DASHBOARD
-------------------------------- */

export async function getFinancialDashboard(){

const res = await fetch(`${BASE}/financial-dashboard`)

if(!res.ok) throw new Error("financial dashboard error")

return res.json()

}

/* -------------------------------
BALANCE SHEET
-------------------------------- */

export async function getBalanceSheet(){

const res = await fetch(`${BASE}/balance-sheet-engine`)

if(!res.ok) throw new Error("balance sheet error")

return res.json()

}

/* -------------------------------
INCOME STATEMENT
-------------------------------- */

export async function getIncomeStatement(){

const res = await fetch(`${BASE}/income-statement-engine`)

if(!res.ok) throw new Error("income statement error")

return res.json()

}

/* -------------------------------
RECENT TRANSACTIONS
-------------------------------- */

export async function getRecentTransactions(){

const res = await fetch(`${BASE}/financial-dashboard`)
const data = await res.json()

return data.recent_transactions || []

}
