// 分路由引入
var home = require('./home')
var signup = require('./signup')
var signout = require('./signout')
var signin = require('./signin')
var article = require('./article')
var test = require('./test')
// var try = require('./try')
// var fileshow = require('./fileshow')
var i = 0
// 路由
function routes (app) {
  app.use('/', home)   // home.js中的ArticleModel应该先用var ArticleModel = require('../models/mongooseSchema').article(mongoose)
  app.use('/signup', signup)
  app.use('/signout', signout)
  app.use('/signin', signin)
  app.use('/article', article)

  app.use('/try/:name/:title/:id', function (req, res) {
    var result = {
      name: req.params.username,
      title: req.params.title,
      id: req.params.id
    }

    console.log('.....................' + i++ + '...........................')
    console.log(result)
    console.log('...................................................')
    res.end()
  })
  app.use('/test', test)
  // app.use('/fileshow', fileshow)，而不是mongoose.model('article')
}

module.exports = routes
