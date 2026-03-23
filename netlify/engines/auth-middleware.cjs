const jwt = require("jsonwebtoken")

module.exports = (event, secret) => {
  try {
    const authHeader = event.headers.authorization
    if (!authHeader) throw new Error("no token")

    const token = authHeader.split(" ")[1]

    if (!secret) throw new Error("missing secret")

    const decoded = jwt.verify(token, secret)

    return decoded.user

  } catch (err) {
    return null
  }
}
