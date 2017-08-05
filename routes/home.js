var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var ArticleModel = require('../models/mongooseSchema').article(mongoose)
var ArticleModel = mongoose.model('article')
// 首页

router.get('/', function (req, res) {
  ArticleModel.find({})
    .then(function (articles) {
      try {
        if (!articles) throw new Error('至今为止还没有任何文章被发表')
      } catch (e) {
        req.flash('error', e.message)
        return res.redirect('/')
      }
      if (articles) {
        res.render('author_summary', { res: articles })
      }
    })
})

module.exports = router
