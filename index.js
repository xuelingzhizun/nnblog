var path = require('path')
var express = require('express')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var mongoose = require('mongoose')
var flash = require('connect-flash')
var config = require('config-lite')(__dirname)
var routes = require('./routes/index')
var sess = require('./models/sess')(config, MongoStore)
var localVariables = require('./models/localVariables')
var mongooseConnect = require('./models/mongooseConnect')
var app = express()
// var sess = {
//   name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
//   secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
//   resave: true, // 强制更新 session
//   saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
//   cookie: {
//     maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
//   },
//   store: new MongoStore({// 将 session 存储到 mongodb
//     url: config.mongodb// mongodb 地址
//   })
// }
// 使用mongoose链接启动数据库
mongooseConnect(mongoose, config)

// 设置模板目录
app.set('views', path.join(__dirname, 'views'))

// 设置模板引擎为 ejs
app.set('view engine', 'ejs')

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')))

// session 中间件
app.use(session(sess))

// flash 中间件，用来显示通知
app.use(flash())

// 设置几个模板中用的变量
localVariables.appLocals(app, config)
app.use(localVariables.resLocals)

// 路由
routes(app)

// 监听端口，启动程序
app.listen(config.port, function () {
  console.log(`${config.name} listening on port ${config.port}`)
})
