var express = require('express');
var router = express.Router();

//检查登录状态　控制访问权限
var checklogin = require("../models/checklogin"); 

var Post = require('../models/post');  //文章数据模型

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/post',checklogin.checkLogin);
router.get('/post',function(req,res,next){
  res.render('post',{ 
    h1:'发表 get',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  })
})

router.post('/post',checklogin.checkLogin)
router.post('/post', function (req, res) {
  var currentUser = req.session.user,
      post = new Post(currentUser.name, req.body.title, req.body.post);
  post.save(function (err) {
    if (err) {
      req.flash('error', err); 
      return res.redirect('/');
    }
    req.flash('success', '发布成功!');
    res.redirect('/');//发表成功跳转到主页
  });
});

router.get('/logout',checklogin.checkLogin);
router.get('/logout', function (req, res) {
  req.session.user = null;
  req.flash('success', '登出成功!');
  res.redirect('/');//登出成功后跳转到主页
});

module.exports = router;
