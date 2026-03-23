require("dotenv").config()

const express = require("express")
const app = express()

app.use(express.json())

app.all("/engine/:name", async (req, res) => {
  try {
    const name = req.params.name

    const engine = require(`./netlify/engines/${name}.cjs`)

    const result = await engine({
      body: JSON.stringify(req.body),
      queryStringParameters: req.query,
      headers: req.headers
    })

    res.status(result.statusCode || 200)

    try {
      res.send(result.body)
    } catch {
      res.send(JSON.stringify(result))
    }

  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.listen(3000, () => {
  console.log("Server running on 3000")
})
