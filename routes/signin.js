var express = require('express')
var router = express.Router()
var sha1 = require('sha1')
var mongoose = require('mongoose')
var check = require('../models/check.js')
// var UserModule = require('../models/mongooseSchema').user(mongoose)
var UserModel = mongoose.model('users')

// GET /signout 登出
router.post('/', check.NeedNoLogin, function (req, res) {
  var users = {
    email: req.fields.email,
    password: req.fields.password
  }

  UserModel.findOne({ email: users.email }, function (err, auser) {
    try {
      if (!auser) {
        throw new Error('登录失败：用户名或者密码错误')
      } else {
        console.log('找到了登录的邮箱，说明有这个账户')
        var sha1password = sha1(users.password) // password 加密
        console.log('1')
        if (auser.password === sha1password) {
          console.log('2')
          req.session.user = auser
          console.log('3')
          req.flash('success', '账户登录')
          console.log('4')
          // 登出成功后跳转到主页
          res.redirect('/')
        } else {
          throw new Error('登录失败：用户名或者密码错误')
        }
      }
      console.log('5')
      if (err) throw new Error('`UserModule.findOne()`内部错误')
    } catch (e) {
      console.log('6')
      req.flash('error', e.message)
      return res.redirect('/')
    }
  })
})

module.exports = router
