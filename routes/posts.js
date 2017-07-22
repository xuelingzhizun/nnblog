var express = require('express')
var router = express.Router()

var check = require('../models/check.js')

router.route('/')
  // GET /posts 所有用户或者特定用户的文章页
  .get(function (req, res, next) {
    res.send(req.flash())
  })
  // POST /posts 发表一篇文章
  .post(check.BeReqLogin, function (req, res, next) {
    res.send(req.flash())
  })

// GET /posts/create 发表文章页
router.get('/create', check.BeReqLogin, function (req, res, next) {
  res.send(req.flash())
})

// GET /posts/:postId 单独一篇的文章页
router.get('/:postId', function (req, res, next) {
  res.send(req.flash())
})

router.route('/:postId/edit')
  // GET /posts/:postId/edit 更新文章页
  .get(check.BeReqLogin, function (req, res, next) {
    res.send(req.flash())
  })
  // POST /posts/:postId/edit 更新一篇文章
  .post(check.BeReqLogin, function (req, res, next) {
    res.send(req.flash())
  })

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', check.BeReqLogin, function (req, res, next) {
  res.send(req.flash())
})

// POST /posts/:postId/comment 创建一条留言
router.post('/:postId/comment', check.BeReqLogin, function (req, res, next) {
  res.send(req.flash())
})

// GET /posts/:postId/comment/:commentId/remove 删除一条留言
router.get('/:postId/comment/:commentId/remove', check.BeReqLogin, function (req, res, next) {
  res.send(req.flash());
});

module.exports = router
