var express = require('express')
var router = express.Router()

var check = require('../models/check.js')

// GET /signin 登录页
router.route('/')
  // GET /signin 登录页
  .get(check.NoLoginAgain, function (req, res, next) {
    res.send(req.flash())
  })
  // POST /signin 用户登录
  .post('/', check.NoLoginAgain, function (req, res, next) {
    res.send(req.flash())
  })

module.exports = router
