var express = require('express')
var router = express.Router()
var check = require('../models/check.js')

// GET /signout 登出
router.get('/', check.NeedLogin, function (req, res) {
  // 清空 session 中用户信息
  req.session.user = null
  req.flash('success', '账户已退出')
  // 登出成功后跳转到主页
  res.redirect('/')
})

module.exports = router
