exports.runEngine = async function(engine, event, context) {

  const TIMEOUT = 8000

  return new Promise(async (resolve) => {

    let finished = false

    const timer = setTimeout(() => {

      if (!finished) {

        finished = true

        resolve({
          statusCode: 504,
          body: JSON.stringify({
            error: "engine timeout"
          })
        })

      }

    }, TIMEOUT)

    try {

      const result = await engine.handler(event, context)

      if (!finished) {

        finished = true
        clearTimeout(timer)

        resolve(result)

      }

    } catch (err) {

      if (!finished) {

        finished = true
        clearTimeout(timer)

        resolve({
          statusCode: 500,
          body: JSON.stringify({
            error: err.message
          })
        })

      }

    }

  })

}
