var fs = require('fs')
var path = require('path')
var express = require('express')
var mongoose = require('mongoose')
var sha1 = require('sha1')
var UserModule = require('../models/mongooseSchema').user(mongoose)
var check = require('../models/check')
var router = express.Router()

// 注册页
router.post('/', check.NeedNoLogin, function (req, res) {
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

  try {
    if (!(users.name.length >= 1 && users.name.length < 10)) {
      throw new Error('注册失败：用户名需要控制在十个字符之内')
    }
    // if (ModuleUser.find({name: users.name},)) {
    //   throw new Error('注册失败：用户名重复')
    // }
    if (users.password.length < 6) {
      throw new Error('注册失败：密码至少 6 个字符')
    }
    if (!(users.repassword === users.password)) {
      throw new Error('注册失败：两次输入的密码不相同')
    }
    if (!users.iconpastname) {
      throw new Error('注册失败：没有上传你的头像')
    }
    if (!(users.profile.length <= 30)) {
      throw new Error('注册失败：个人简介请限制在 1-30 个字符')
    }
    // 本段代码之所以注释，是因为考虑到findOne方法是异步的，在错误出来之前就已经略过catch了，不能有效捕捉错误，反而导致程序因没有合适的错误处理方式而出错而停止
    // UserModule.findOne({ name: users.name })
    //   .exec(function (err, auser) {
    //     if (err) throw new Error('内部错误')
    //     if (auser) {
    //       console.log('auser:' + auser)
    //       throw new Error('注册失败：用户名重复')
    //     }
    //   })
  } catch (e) {
    // 注册失败清除上传的头像
    console.log('had catch 1') // %%debug 可以删除
    fs.unlink(users.iconurl, function (err) {
      if (err) return console.error(err)
    })
    req.flash('error', e.message)
    return res.redirect('/')
  }
  // 查询用户名是否为重复
  UserModule.findOne({ name: users.name }, function (err, auser) {
    if (err) throw new Error('`UserModule.findOne()`内部错误')
    if (auser) {
      console.log('auser:' + auser) // %%debug 可以删除
      // 用户名重复 删除所上传的头像
      fs.unlink(users.iconurl, function (err) {
        if (err) return console.error(err)
      })
      req.flash('error', '注册失败：用户名重复')
      return res.redirect('/')
    }

    var sha1password = sha1(users.password) // password 加密
    // mongoose 中的创建具体的文档的方法 
    var user = new UserModule({
      name: users.name,
      password: sha1password,
      email: users.email,
      icon: users.iconnowname, // 头像
      profile: users.profile // 简介
    })
    UserModule.create(user).then(req.flash('success', '注册成功'))
    return res.redirect('/')
  })
  // user.save(function (err) {
  //   console.log('5')
  //   if (err) return console.error(err)
  //   req.session.user = user
  //   req.flash('success', '注册成功')
  // })
  // console.log('6')
  // return res.redirect('/article')
})

module.exports = router
