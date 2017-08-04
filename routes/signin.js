var express = require('express')
var router = express.Router()
var sha1 = require('sha1')
var mongoose = require('mongoose')
var check = require('../models/check.js')
var UserModule = require('../models/mongooseSchema').user(mongoose)

// GET /signout 登出
router.post('/', check.NeedNoLogin, function (req, res) {
  var users = {
    email: req.fields.email,
    password: req.fields.password
  }

  UserModule.findOne({ email: users.email }, function (err, auser) {
    try {
      if (!auser) {
        throw new Error('登录失败：用户名或者密码错误')
      } else {
        var sha1password = sha1(auser.password) // password 加密
        if (auser.password === sha1password) {
          req.session.user = auser
          req.flash('success', '账户已退出')
          // 登出成功后跳转到主页
          res.redirect('/')
        } else {
          throw new Error('登录失败：用户名或者密码错误')
        }
      }
      if (err) throw new Error('`UserModule.findOne()`内部错误')
    } catch (e) {
      req.flash('error', e.message)
      return res.redirect('/')
    }
  })
})

module.exports = router
