// 设置模板需要几个局部变量
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
}

module.exports = {
  appLocals: appLocals,
  resLocals: resLocals
}
