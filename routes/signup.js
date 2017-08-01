var fs = require('fs')
var path = require('path')
var express = require('express')
var mongoose = require('mongoose')
var sha1 = require('sha1')
var ModuleUser = require('../models/mongooseSchema').user(mongoose)
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
  } catch (e) {
    // 注册失败清除上传的头像
    fs.unlink(users.iconurl, function (err) {
      if (err) return console.error(err)
    })
    req.flash('error', e.message)
    return res.redirect('/')
  }

  var sha1password = sha1(users.password)

  console.log('1')
  ModuleUser.findOne({ name: 'fwefw' }, function (err, auser) {
    console.log(auser)
    console.log(auser.name)
    if (err) {
      console.error(err)
      console.log('2')
      return res.redirect('/')
    }
    console.log('2' + auser.name)
    if (auser.name) {
      console.log('3' + auser.name)
      req.flash('error', '用户已存在!')
      return res.redirect('/') // 返回注册页
    }
    console.log('4')
    var user = new ModuleUser({
      name: users.name,
      password: sha1password,
      email: users.email,
      icon: users.iconnowname, // 头像
      profile: users.profile // 简介
    })
    ModuleUser.create(user)
    return res.redirect('/')
  })

  console.log('5')
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
