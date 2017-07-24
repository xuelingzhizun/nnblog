function connect (mongoose, config) {
  var db = mongoose.connection

  mongoose.connect(config.mongodb)

  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function (callback) {
    // yay!
    console.log('connect success')
  })
}

module.exports = connect
