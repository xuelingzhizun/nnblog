var path = require('path')
var config = require('config-lite')(__dirname)
var pkg = require('./package')
var express = require('express')
var app = express()

// 设置模板目录
app.set('views', path.join(__dirname, 'views'))
// 设置模板引擎为 ejs
app.set('view engine', 'ejs')

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')))
// session 中间件
app.get('/viewdirectory', function (req, res) {
  res.send('The views directory is ' + req.app.get('views'))
  console.log(req.app, '-------------------------/n', req.app.get)
  console.log(app.locals.title, app.locals.email)
})

// 监听端口，启动程序
app.listen(config.port, function () {
  console.log(`${pkg.name} listening on port ${config.port}`)
})
