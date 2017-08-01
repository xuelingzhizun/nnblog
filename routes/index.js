var express = require('express');
var router = express.Router();

//数据库操作　实现用户信息存储
var crypto = require('crypto');　　//散散列值生成模块　用于加密
var User = require('../models/user'),  //用户模型文件
    Post = require('../models/post');

//检查登录状态　控制访问权限
var checklogin = require("../models/checklogin"); 


/* GET home page. */
router.get('/', function(req, res, next) {
  Post.get(null,function(err,posts){ //用于读取数据库中的文章信息
    if(err){
      posts = [];
    }

  res.render('index',
   { h1: '主页 get',
     user: req.session.user,
     posts: posts,
     success: req.flash("success").toString(),
     error: req.flash("error").toString()
   });
 });
});

/* GET register page */
router.get('/register',checklogin.checkNotLogin);
router.get('/register', function (req, res) {
  res.render('reg', {
    h1: '注册',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

router.post('/register',checklogin.checkNotLogin);
router.post('/register', function (req, res) {
  var name = req.body.name,
      password = req.body.password,
      password_re = req.body['password-repeat'];
  //检验用户两次输入的密码是否一致
  if (password_re != password) {
    req.flash('error', '两次输入的密码不一致!'); 
    return res.redirect('/reg');//返回注册页
  }
  console.log('1'+password);////////////////////////////////////////////
  //生成密码的 md5 值
  var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
      console.log('2'+password);///////////////////////////////////////////
      console.log("3"+md5);/////////////////////////////////////////////////
  var newUser = new User({
      name: name,
      password: password,
      email: req.body.email
  });
  //检查用户名是否已经存在 
  User.get(newUser.name, function (err, user) {
    if (err) {
      req.flash('error', err);
      return res.redirect('/');
    }
    if (user) {
      req.flash('error', '用户已存在!');
      return res.redirect('/reg');//返回注册页
    }
    //如果不存在则新增用户
    newUser.save(function (err, user) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/reg');//注册失败返回主册页
      }
      req.session.user = newUser;//用户信息存入 session
      req.flash('success', '注册成功!');
      res.redirect('/');//注册成功后返回主页
    });
  });
});

/* GET login page */
router.get('/login',checklogin.checkNotLogin);
router.get('/login',function(req,res,next){
  res.render('login',{ 
    h1:'登录 get',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  })                 
})

router.post('/register',checklogin.checkNotLogin);
router.post('/login', function (req, res) {
  //生成密码的 md5 值
  var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
  //检查用户是否存在
  User.get(req.body.name, function (err, user) {
    if (!user) {
      req.flash('error', '用户不存在!'); 
      return res.redirect('/login');//用户不存在则跳转到登录页
    }
    //检查密码是否一致
    if (user.password != password) {
      req.flash('error', '密码错误!'); 
      return res.redirect('/login');//密码错误则跳转到登录页
    }
    //用户名密码都匹配后，将用户信息存入 session
    req.session.user = user;
    req.flash('success', '登陆成功!');
    res.redirect('/');//登陆成功后跳转到主页
  });
});

module.exports = router;
