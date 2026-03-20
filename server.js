require("dotenv").config()

const express = require("express")
const app = express()

app.use(express.json())

app.all("/engine/:name", async (req, res) => {

  try {

    const engineName = req.params.name
    const engine = require(`./netlify/engines/${engineName}.cjs`)

    const result = await engine({
      body: JSON.stringify(req.body),
      queryStringParameters: req.query
    })

    res.status(result.statusCode || 200).send(result.body)

  } catch (err) {

    res.status(500).send({ error: err.message })

  }

})

app.listen(3000, () => {
  console.log("🚀 TKFM ENGINE SERVER RUNNING ON 3000")
})
