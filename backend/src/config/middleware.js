const morgan = require('morgan')
const security = require('./security')

morgan.token('content', req => {
  return JSON.stringify(req.body)
})

const logger = morgan(
  ':method :url :content :status :res[content-length] - :response-time ms'
)

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const token = (req, res, next) => {
  try {
    const token = getTokenFrom(req)
    req.token = token ? security.verify(token) : null
    next()
  } catch (ex) {
    console.log(ex)
    res.status(400).send({ error: 'Invalid token' })
  }
}

const error = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

module.exports = {
  logger,
  error,
  token
}
