const jwt = require("jsonwebtoken")

module.exports = (event) => {
  try {
    const auth = event.headers.authorization

    if(!auth) throw new Error("no token")

    const token = auth.split(" ")[1]
    const decoded = jwt.verify(token, process.env.TKFM_JWT_SECRET)

    return decoded.user

  } catch(err){
    return null
  }
}
