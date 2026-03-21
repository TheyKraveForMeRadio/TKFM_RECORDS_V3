const express = require("express")
const http = require("http")
const WebSocket = require("ws")
require("dotenv").config()

const app = express()

// ✅ SERVE FRONTEND
app.use(express.static("public"))

// ✅ CORS
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Allow-Headers","Origin, Content-Type, Authorization")
  res.header("Access-Control-Allow-Methods","GET, POST, OPTIONS")
  if(req.method === "OPTIONS") return res.sendStatus(200)
  next()
})

// ✅ SECURITY (NO unsafe-eval)
app.use((req,res,next)=>{
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' https: ws:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;"
  )
  next()
})

app.use(express.json())

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

function broadcast(data){
  const msg = JSON.stringify(data)
  wss.clients.forEach(c=>{
    if(c.readyState === 1) c.send(msg)
  })
}

app.all("/engine/:name", async (req,res)=>{
  try{
    const engine = require(`./netlify/engines/${req.params.name}.cjs`)
    const result = await engine({
      body: JSON.stringify(req.body),
      queryStringParameters: req.query,
      headers: req.headers
    })

    if(req.params.name === "market-loop-engine"){
      broadcast({ type:"market_update" })
    }

    res.status(result.statusCode).send(result.body)

  }catch(err){
    res.status(500).json({ error: err.message })
  }
})

const PORT = process.env.PORT || 3000
server.listen(PORT, ()=>console.log("🚀 TKFM LIVE ON PORT", PORT))
