// Check permissions
// 如果没登录就提示未登录且定向到登录界面，如果登录了就交给下一个控件（也就是说，已登陆，此控件不作处理）
function NeedLogin (req, res, next) {
  if (!req.session.user) {
    req.flash('error', '未登录')
    return res.redirect('/signin')
  }

  next()
}

// 如果登录了就提示登录且返回之前的界面，如果没登录就交给下一个控件（也就是说，未登录，此控件不作处理）
function NeedNoLogin (req, res, next) {
  if (req.session.user) {
    req.flash('error', '已登录')
    return res.redirect('back')
  }

  next()
}

module.exports = {
  NeedLogin: NeedLogin,
  NeedNoLogin: NeedNoLogin
}
