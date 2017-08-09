const express = require('express');

const router = express.Router();
const sha1 = require('sha1');
const mongoose = require('mongoose');
const check = require('../models/check.js');
// var UserModule = require('../models/mongooseSchema').user(mongoose)
const UserModel = mongoose.model('users');

// GET /signout 登出
router.post('/', check.NeedNoLogin, (req, res) => {
  const users = {
    name: req.fields.username,
    password: req.fields.password,
  };

  UserModel.findOne({ name: users.name }, (err, auser) => {
    try {
      if (!auser) {
        throw new Error('登录失败：用户名或者密码错误');
      } else {
        const sha1password = sha1(users.password); // password 加密
        if (auser.password === sha1password) {
          req.session.user = auser;
          req.flash('success', '账户登录');
          // 登出成功后跳转到主页
          res.redirect('/');
        } else {
          throw new Error('登录失败：用户名或者密码错误');
        }
      }
      if (err) throw new Error('`UserModule.findOne()`内部错误');
    } catch (e) {
      req.flash('error', e.message);
      return res.redirect('/');
    }
  });
});

module.exports = router;
