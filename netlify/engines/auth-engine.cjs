const Redis = require("ioredis")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const redis = new Redis(process.env.REDIS_URL)
const SECRET = process.env.TKFM_JWT_SECRET

module.exports = async (event) => {
  try {
    const { action, user, password } = JSON.parse(event.body)

    if(action === "register"){
      const exists = await redis.get(`user:${user}`)
      if(exists){
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "user exists" })
        }
      }

      const hash = await bcrypt.hash(password, 10)

      await redis.set(`user:${user}`, hash)
      await redis.set(`wallet:${user}`, 0)
      await redis.set(`xp:${user}`, 0)

      return {
        statusCode: 200,
        body: JSON.stringify({ status: "registered" })
      }
    }

    if(action === "login"){
      const hash = await redis.get(`user:${user}`)

      if(!hash){
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "user not found" })
        }
      }

      const valid = await bcrypt.compare(password, hash)

      if(!valid){
        return {
          statusCode: 401,
          body: JSON.stringify({ error: "invalid login" })
        }
      }

      const token = jwt.sign({ user }, SECRET, { expiresIn: "7d" })

      return {
        statusCode: 200,
        body: JSON.stringify({ token })
      }
    }

  } catch(err){
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
