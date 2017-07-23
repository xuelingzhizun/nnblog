var express = require('express')
var router = express.Router()

// 首页
router.get('/', function (req, res) {
  res.send(req.flash())
})

module.exports = router
