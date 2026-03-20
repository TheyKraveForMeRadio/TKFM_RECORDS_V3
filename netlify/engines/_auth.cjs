const jwt = require("jsonwebtoken")

const SECRET = process.env.JWT_SECRET || "tkfm_secret"

module.exports = (event) => {

  const header = event.headers?.authorization || ""

  if (!header.startsWith("Bearer ")) {
    throw new Error("unauthorized")
  }

  const token = header.split(" ")[1]

  const decoded = jwt.verify(token, SECRET)

  return decoded.username
}
