import openSocket from 'socket.io-client'

const { hostname, port } = window.location

const socket = openSocket(window.protocol + '://' + hostname + ':' + port)

export const subscribeToTimer = callback => {
  socket.on('timer', timestamp => callback(null, timestamp))
  socket.emit('subscribeToTimer', 1000)
}

export const pollBlogs = callback => {
  socket.on('blogs', blogs => callback(null, JSON.parse(blogs)))
  socket.emit('pollBlogs', 5000)
}

export const subscribeToBlogs = callback => {
  socket.on('blogChange', change => callback(null, JSON.parse(change)))
  socket.emit('subscribeToBlogs', 5000)
}

export const receiveBroadcast = (type, callback) => {
  socket.on(type, data => {
    callback(null, JSON.parse(data))
  })
}
