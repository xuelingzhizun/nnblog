var express = require('express')
var router = express.Router()
var check = require('../models/check.js')

// GET /signup 注册页
router.route('/')
  .get(check.NoLoginAgain, function (req, res, next) {
    res.send(req.flash())
  })
  // POST /signup 用户注册
  .post(check.NoLoginAgain, function (req, res, next) {
    res.send(req.flash())
  })

module.exports = router
