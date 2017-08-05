var fs = require('fs')
var path = require('path')
var express = require('express')
var mongoose = require('mongoose')
var sha1 = require('sha1')
var UserModel = require('../models/mongooseSchema').user(mongoose)
var check = require('../models/check')
var router = express.Router()

// 注册页
router.post('/', check.NeedNoLogin, function (req, res) {
  // try {
  //   if (req.files === {}) throw new Error('请求不合法 禁止操作')
  // } catch (e) {
  //   console.log('sssssssssssssssssssssssssssssssssssssss')
  //   req.flash('error', e.message)
  //   return res.redirect('/')
  // }
  // console.log(typeof (req.files))
  var users = {
    name: req.fields.username,
    password: req.fields.password,
    repassword: req.fields.repassword,
    email: req.fields.email,
    iconurl: req.files.icon.path,
    iconnowname: req.files.icon.path.split(path.sep).pop(),
    iconpastname: req.files.icon.name,
    profile: req.fields.profile
  }

  // 查询用户名是否为重复
  UserModel.findOne({ name: users.name }, function (err, auser) {
    try {
      if (!(users.name.length >= 1 && users.name.length < 10)) throw new Error('注册失败：用户名需要控制在十个字符之内')
      if (auser) throw new Error('注册失败：用户名重复')
      if (users.password.length < 6) throw new Error('注册失败：密码至少 6 个字符')
      if (!(users.repassword === users.password)) throw new Error('注册失败：两次输入的密码不相同')
      if (!users.iconpastname) throw new Error('注册失败：没有上传你的头像')
      if (!(users.profile.length <= 30)) throw new Error('注册失败：个人简介请限制在 1-30 个字符')
      if (err) throw new Error('`UserModule.findOne()`内部错误')
    } catch (e) {
      fs.unlink(users.iconurl, function (err) {
        if (err) return console.error(err)
      })
      req.flash('error', e.message)
      return res.redirect('/')
    }

    var sha1password = sha1(users.password) // password 加密
    // mongoose 中的创建具体的文档的方法 
    var user = new UserModel({
      name: users.name,
      password: sha1password,
      email: users.email,
      icon: users.iconnowname, // 头像
      profile: users.profile // 简介
    })
    UserModel.create(user).then(
      function (saveuser) {  // 毕竟还没有学promise，这个then（）调用之后就不产生回调的问题，也就不会有error这个参数
        req.session.user = saveuser
        req.flash('success', '注册成功')
        return res.redirect('/')
      })
  })
})

module.exports = router
