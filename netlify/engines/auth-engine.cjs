const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { getRedis } = require("../functions/_redis")

const SECRET = process.env.JWT_SECRET || "tkfm_secret"

module.exports = async (event) => {

  const redis = getRedis()
  const body = JSON.parse(event.body || "{}")

  const { action, username, password } = body

  if (!action || !username || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "missing fields" })
    }
  }

  const key = `user:${username}`

  // REGISTER
  if (action === "register") {

    const exists = await redis.get(key)
    if (exists) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "user exists" })
      }
    }

    const hash = await bcrypt.hash(password, 10)

    const user = {
      username,
      password: hash,
      balance: 1000,
      assets: {}
    }

    await redis.set(key, JSON.stringify(user))

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "registered" })
    }
  }

  // LOGIN
  if (action === "login") {

    const data = await redis.get(key)
    if (!data) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "user not found" })
      }
    }

    const user = JSON.parse(data)

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "invalid password" })
      }
    }

    const token = jwt.sign({ username }, SECRET, { expiresIn: "7d" })

    return {
      statusCode: 200,
      body: JSON.stringify({ token })
    }
  }

}
