var express = require('express')
var router = express.Router()

// 首页
router.get('/', function (req, res) {
  res.render('article')
})

module.exports = router
