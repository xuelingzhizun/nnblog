// 分路由引入
var home = require('./home')
var signup = require('./signup')
var signout = require('./signout')
var signin = require('./signin')
var article = require('./article')
// var fileshow = require('./fileshow')

// 路由
function routes (app) {
  app.use('/', home)
  app.use('/signup', signup)
  app.use('/signout', signout)
  app.use('/signin', signin)
  app.use('/article', article)
  // app.use('/fileshow', fileshow)
}

module.exports = routes
