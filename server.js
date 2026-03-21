const express = require("express")
const http = require("http")
const WebSocket = require("ws")
const path = require("path")

const app = express()

// ✅ ABSOLUTE PUBLIC PATH (CRITICAL FIX)
const PUBLIC_DIR = path.join(__dirname, "public")
app.use(express.static(PUBLIC_DIR))

// ✅ JSON
app.use(express.json())

// 🔥 FORCE ROUTES (NO 404 EVER AGAIN)
app.get("/", (req,res)=>{
  res.sendFile(path.join(PUBLIC_DIR, "trading-app.html"))
})

app.get("/trading-app", (req,res)=>{
  res.sendFile(path.join(PUBLIC_DIR, "trading-app.html"))
})

app.get("/trading-app.html", (req,res)=>{
  res.sendFile(path.join(PUBLIC_DIR, "trading-app.html"))
})

// 🔥 ENGINE ROUTER (KEEP YOUR SYSTEM WORKING)
app.all("/engine/:name", async (req,res)=>{
  try{
    const engine = require(`./netlify/engines/${req.params.name}.cjs`)
    const result = await engine({
      body: JSON.stringify(req.body),
      queryStringParameters: req.query,
      headers: req.headers
    })
    res.status(result.statusCode).send(result.body)
  }catch(err){
    res.status(500).json({ error: err.message })
  }
})

// 🔥 WEBSOCKET (OPTIONAL BUT SAFE)
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

wss.on("connection", ()=>console.log("⚡ WS Connected"))

const PORT = 3000
server.listen(PORT, ()=>console.log("🚀 TKFM LOCAL FIXED:", PORT))
