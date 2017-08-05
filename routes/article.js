var express = require('express')
var router = express.Router()
var check = require('../models/check')
var mongoose = require('mongoose')
// var ArticleModel = require('../models/mongooseSchema').article(mongoose)
var ArticleModel = mongoose.model('article')
// 首页
router.get('/', function (req, res) {
  res.render('article')
})

// 点击头像展示 特定作者的所有文章summary方式展示
router.get('/:author', check.NeedLogin, function (req, res) {
  ArticleModel.find({ author: req.params.author })
    .then(function (articles) {
      try {
        if (!articles) throw new Error('该作者未曾发表文章')
      } catch (e) {
        req.flash('error', e.message)
        return res.redirect('/')
      }
      if (articles) {
        res.render('author_summary', { res: articles })
      }
    })
})

router.post('/', check.NeedLogin, function (req, res) {
  var article = {
    author: req.session.user.name,
    title: req.fields.title,
    summary: req.fields.summary,
    content: req.fields.content
  }
  try {
    if (!article.title) throw new Error('未填写标题')
    if (!article.summary) throw new Error('未填写摘要')
    if (!article.content) throw new Error('未填写正文内容')
  } catch (error) {
    req.flash('error', error.message)
    return res.redirect('/article')
  }
  ArticleModel.create(article, function (error, result) {
    if (error) console.error(result)
    req.flash('success', '文章发表成功')
    return res.redirect('/article')
  })
  // ArticleModel.create(article)
  //   .then(function (error, result) {
  //     if (error) console.error(result + '不会是我？？？')  //如果要用这一段代码 ，就需要把这个函数中的error参数去掉，因为使用then之后，就不再有error这个参数了，具体的需要看promise
  //     req.flash('success', '文章发表成功')
  //     return res.redirect('/article')
  //   })
})

module.exports = router
