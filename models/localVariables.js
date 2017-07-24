// 设置模板需要几个局部变量
/**
 * 
 * @param {*} app   var app = express() 
 * @param {*} config 普通对象，需要包含本模块所需要的属性或是对象，可以通过自己建立config模块作为实参
 */
// 贯穿于整个app生命线的变量
function appLocals (app, config) {
  app.locals = {
    title: config.name,
    description: config.description
  }
}
// 生命周期只为单次请求的变量
function resLocals (req, res, next) {
  res.locals = {
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  }
  next()
}

module.exports = {
  appLocals: appLocals,
  resLocals: resLocals
}
