// 分路由引入
var home = require('./home')
var posts = require('./posts')
var signin = require('./signin')
var signout = require('./signout')
var signup = require('./signup')

// 路由
function routes (app) {
  app.use('/', home)
  app.use('/posts', posts)
  app.use('/signin', signin)
  app.use('/signout', signout)
  app.use('/signup', signup)
}

module.exports = routes
