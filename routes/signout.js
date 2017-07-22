var express = require('express')
var router = express.Router()
var check = require('../models/check.js')

// GET /signout 登出
router.get('/', check.NoLoginAgain, function (req, res, next) {
  res.send(req.flash())
})

module.exports = router
