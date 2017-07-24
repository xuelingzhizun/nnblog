var path = require('path')
var config = require('config-lite')(__dirname)
var pkg = require('./package')
var express = require('express')
var app = express()

// 设置模板需要几个局部变量
// 贯穿于整个app生命线的变量
app.locals = {
  title: 'niaho ', // ok locals.title
  des: 'sdsdsfsfsfsfsfsfsdfsfese', // ok
  test: 'dsfsfseweweeeeeeeeeeeeeeeeeee' // ok test
}
app.locals.test = {
  title: 'niaho ', // ok test.title
  des: 'sdsdsfsfsfsfsfsfsdfsfese' // ok locals.test.des
}
app.locals.title = {
  title: 'niaho ', // ok title.title
  des: 'sdsdsfsfsfsfsfsfsdfsfese'
}
/**
 * 总结：
 *    ① app不能出现在模板中
 *    ② app.a.b.c 最多有四层
 */

// 设置模板目录
app.set('views', path.join(__dirname, 'views'))
// 设置模板引擎为 ejs
app.set('view engine', 'ejs')

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')))
// session 中间件

app.get('/', function (req, res) {
  res.render('test')
})

app.listen(config.port, function () {
  console.log(`${pkg.name} listening on port ${config.port}`)
})
