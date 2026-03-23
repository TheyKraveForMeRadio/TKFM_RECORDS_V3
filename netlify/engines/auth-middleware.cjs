const jwt = require("jsonwebtoken")

module.exports = (event) => {
  try {
    const authHeader = event.headers.authorization
    if (!authHeader) throw new Error("no token")

    const token = authHeader.split(" ")[1]

    const secret = process.env.TKFM_JWT_SECRET
    if (!secret) {
      console.error("❌ JWT SECRET MISSING")
      throw new Error("missing secret")
    }

    return jwt.verify(token, secret).user

  } catch (err) {
    console.error("AUTH ERROR:", err.message)
    return null
  }
}
