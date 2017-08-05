// 分路由引入
var home = require('./home')
var signup = require('./signup')
var signout = require('./signout')
var signin = require('./signin')
var article = require('./article')

// 路由
function routes (app) {
  app.use('/', home) // home.js中的ArticleModel应该先用var ArticleModel = require('../models/mongooseSchema').article(mongoose)
  app.use('/signup', signup)
  app.use('/signout', signout)
  app.use('/signin', signin)
  app.use('/article', article)
}

module.exports = routes
