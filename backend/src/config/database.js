const mongoose = require('mongoose')
const { mongoUrl } = require('./env')

module.exports = mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('Connected to database', mongoUrl)
  })
  .catch(err => {
    console.log(err)
  })
