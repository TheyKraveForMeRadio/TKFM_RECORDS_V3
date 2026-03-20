require("dotenv").config()

const express = require("express")
const app = express()

app.use(express.json())

app.all("/engine/:name", async (req, res) => {

  try {

    const engineName = req.params.name
    const mod = require(`./netlify/engines/${engineName}.cjs`)

    const engine = typeof mod === "function" ? mod : mod.handler

    if (!engine) {
      return res.status(500).send({ error: "engine not a function export" })
    }

    // 🔥 PASS HEADERS INTO ENGINE (FIX)
    const result = await engine({
      body: JSON.stringify(req.body),
      queryStringParameters: req.query,
      headers: req.headers   // ✅ THIS FIXES AUTH
    })

    res.status(result?.statusCode || 200).send(result?.body || result)

  } catch (err) {

    res.status(500).send({ error: err.message })

  }

})

app.listen(3000, () => {
  console.log("🚀 TKFM ENGINE SERVER RUNNING ON 3000")
})
