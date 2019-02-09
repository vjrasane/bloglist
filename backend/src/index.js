
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const sockets = require('./config/sockets')
sockets.init(server)

const database = require('./config/database')
const middleware = require('./config/middleware')
app.use(middleware.logger)
app.use(middleware.token)

app.use(require('cors')())
app.use(require('body-parser').json())

const blogRouter = require('./controllers/blogs')(sockets)
const userRouter = require('./controllers/users')(sockets)
const loginRouter = require('./controllers/login')

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

const { join } = require('path')

const root = join(__dirname, '../dist')
app.use(express.static(root))

const fallback = require('express-history-api-fallback')
app.use(fallback(join(root, 'index.html')))

app.use(middleware.error)

const { port } = require('./config/env')
server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

server.on('close', () => {
  database.connection.close()
})

module.exports = {
  app,
  server
}
