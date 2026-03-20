require("dotenv").config()

const express = require("express")
const app = express()

app.use(express.json())

// 🔥 ENABLE CORS (FIX)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

  if (req.method === "OPTIONS") {
    return res.sendStatus(200)
  }

  next()
})

app.all("/engine/:name", async (req, res) => {

  try {

    const engineName = req.params.name
    const mod = require(`./netlify/engines/${engineName}.cjs`)
    const engine = typeof mod === "function" ? mod : mod.handler

    if (!engine) {
      return res.status(500).send({ error: "engine not a function export" })
    }

    const result = await engine({
      body: JSON.stringify(req.body),
      queryStringParameters: req.query,
      headers: req.headers
    })

    res.status(result?.statusCode || 200).send(result?.body || result)

  } catch (err) {

    res.status(500).send({ error: err.message })

  }

})

app.listen(3000, () => {
  console.log("🚀 TKFM ENGINE SERVER RUNNING ON 3000")
})
