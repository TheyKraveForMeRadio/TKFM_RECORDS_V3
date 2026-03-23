const express = require("express")
const http = require("http")
const WebSocket = require("ws")
const path = require("path")
const jwt = require("jsonwebtoken")

const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))

// 🔐 SECURITY HEADERS
app.use((req,res,next)=>{
  res.setHeader("X-Frame-Options","DENY")
  res.setHeader("X-Content-Type-Options","nosniff")
  res.setHeader("X-XSS-Protection","1; mode=block")
  next()
})

// 🔐 AUTH
function verify(req){
  const auth = req.headers.authorization || ""
  const token = auth.split(" ")[1]
  if(!token) throw new Error("unauthorized")
  return jwt.verify(token, process.env.JWT_SECRET)
}

// 🔥 ENGINE ROUTER
app.all("/engine/:name", async (req,res)=>{
  try{
    if(req.params.name !== "auth-engine"){
      verify(req)
    }

    const engine = require(`./netlify/engines/${req.params.name}.cjs`)

    const result = await engine({
      body: JSON.stringify(req.body),
      queryStringParameters: req.query,
      headers: req.headers
    })

    res.status(result.statusCode).send(result.body)

  }catch(err){
    res.status(401).json({ error: err.message })
  }
})

app.get("/", (req,res)=>{
  res.sendFile(path.join(__dirname,"public","trading-app.html"))
})

const wss = new WebSocket.Server({ server })
wss.on("connection", ()=>console.log("⚡ WS LIVE"))

server.listen(3000, ()=>console.log("🚀 TKFM LIVE"))
