const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const config = require('config-lite')(__dirname);
const routes = require('./routes/index');
const sess = require('./models/sess')(config, MongoStore);
const localVariables = require('./models/localVariables');
const mongooseConnect = require('./models/mongooseConnect');
const formidable = require('express-formidable');

const app = express();
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
mongooseConnect(mongoose, config);

// 设置模板目录
app.set('views', path.join(__dirname, 'views'));

// 设置模板引擎为 ejs
app.set('view engine', 'ejs');

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// session 中间件
app.use(session(sess));

// flash 中间件，用来显示通知
app.use(flash());

// 设置req解析中间件
app.use(formidable({
  uploadDir: path.join(__dirname, 'public/img/icon'),
  keepExtensions: true,
}));

// 设置几个模板中用的变量 不需要通过req.render()来渲染进模板 
localVariables.appLocals(app, config);
app.use(localVariables.resLocals);

// 路由

routes(app);
// 错误处理中间件
// app.use(function (err, req, res, next) {
//   console.error(err.stack)
//   res.status(500).send('Something broke!')
// })

// 监听端口，启动程序
app.listen(config.port, () => {
  console.log(`${config.name} listening on port ${config.port}`);
});