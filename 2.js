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
var admin = express()

admin.get('/', function (req, res) {
  console.log(admin.mountpath) // [ '/adm*n', '/manager' ]
  res.send('Admin Homepage')
})

var secret = express()
secret.get('/', function (req, res) {
  console.log(secret.mountpath) // /secr*t
  res.send('Admin Secret')
})

admin.use('/secr*t', secret) // load the 'secret' router on '/secr*t', on the 'admin' sub app
app.use(['/adm*n', '/manager'], admin) // load the 'admin' router on '/adm*n' and '/manager', on the parent app
// 监听端口，启动程序
app.listen(config.port, function () {
  console.log(`${pkg.name} listening on port ${config.port}`)
})
