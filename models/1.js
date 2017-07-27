var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/eblog_user') // !!!!!!!!!!可以修改
// mongoose.Promise = global.Promise
var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // yay!
  console.log('connect success')
})

var userSchema = new mongoose.Schema({
  name: {type: 'string'},
  password: {type: 'string'},
  avatar: {type: 'string'},
  gender: {type: 'string'},
  profile: {type: 'string'}

})

// 创建Model
var UserModel = mongoose.model('test1', userSchema)

var fluffy = new UserModel({
  name: 'liuxue',
  password: '370',
  avatar: 'm',
  gender: 'm',
  profile: 'good man'
})

fluffy.save(function (err, fluffy) {
  if (err) return console.error(err)
})
