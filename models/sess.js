// session 的配置文件
/**
 * 
 * @param {*} config  是一个对象，对象内容需要包含本模块需要的对象或是属性
 * @param {*} MongoStore  var MongoStore = require('connect-mongo')(session)
 */
function session (config, MongoStore) {
  var sess = {
    name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true, // 强制更新 session
    saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
      maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({// 将 session 存储到 mongodb
      url: config.mongodb// mongodb 地址
    })
  }

  return sess
}

module.exports = session

// 疑问：config, MongStore 确实定义了，但是session 没定义，难道也可以吗，就算session 作为定义的，但是key很明显是没法定义的
