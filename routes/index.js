// 分路由引入
const home = require('./home');
const signup = require('./signup');
const signout = require('./signout');
const signin = require('./signin');
const article = require('./article');
const message = require('./message');

// 路由
function routes(app) {
  app.use('/', home); // home.js中的ArticleModel应该先用var ArticleModel = require('../models/mongooseSchema').article(mongoose)
  app.use('/signup', signup);
  app.use('/signout', signout);
  app.use('/signin', signin);
  app.use('/article', article);
  app.use('/message', message);
}

module.exports = routes;
