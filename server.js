require("dotenv").config() // 🔥 ADD THIS FIRST

const express = require("express")
const app = express()

// ... KEEP YOUR EXISTING SERVER CODE BELOW

app.get("/debug-jwt", (req,res)=>{
  res.json({
    jwt: process.env.TKFM_JWT_SECRET || "missing"
  })
})

