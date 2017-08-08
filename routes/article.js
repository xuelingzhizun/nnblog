const express = require('express');

const router = express.Router();
const check = require('../models/check');
const mongoose = require('mongoose');

const ArticleModel = mongoose.model('article');
const UserModel = mongoose.model('users');

let render = {};

// 点击头像展示 特定作者的所有文章summary方式展示
router.get('/author=*', check.NeedLogin, (req, res) => { // 此处路由所使用的正则表达式和js默认的方式所展现的情况似乎不同 
  const reqauthor = req.params[0]; // 从路由中获取author= 后面的参数
  // 根据作者 账号名称  查找所有的所属文章
  ArticleModel.find({ author: reqauthor })
    .then((articles) => {
      try {
        if (!articles) throw new Error('该作者未曾发表文章');
      } catch (e) {
        req.flash('error', e.message);
        return res.redirect('/');
      }
      if (articles) {
        render = articles;
        // 在已经确定有articles的情况下 查找该作者的icon
        // 赋值函数1，为了下文的then调用: 将articles(也就是通过作者查到的文章数组)赋值给result这个容器_resdata = recdata;
        UserModel.findOne({ name: reqauthor })
          .then(recdata => new Promise( // 把通过作者账户名获得的账户信息中的icon赋值给render容器
            (resolve) => { render.icon = recdata.icon; resolve(render); },
          ))
          .then(() => { res.render('author_summary', { res: render }); });
      }
    });
});

// 根据文章存储自动生成的_id 来寻找文章  主要用于发表完文章后自动跳转到已发表文章页
router.get('/id=*', check.NeedLogin, (req, res) => { // 此处路由所使用的正则表达式和js默认的方式所展现的情况似乎不同 
  ArticleModel.findOne({ _id: req.params[0] })
    .then((article) => {
      try {
        if (!article) throw new Error('链接文章失败：没有找到该文章');
      } catch (e) {
        req.flash('error', e.message);
        return res.redirect('/');
      }
      if (article) {
        res.render('article', { res: article });
      }
    });
});

// 文章发表 接受提交的文章数据并在校验后存储到数据库
router.post('/', check.NeedLogin, (req, res) => {
  const article = {
    author: req.session.user.name,
    title: req.fields.title,
    summary: req.fields.summary,
    content: req.fields.content,
  };
  try {
    if (!article.title) throw new Error('未填写标题');
    if (!article.summary) throw new Error('未填写摘要');
    if (!article.content) throw new Error('未填写正文内容');
  } catch (error) {
    req.flash('error', error.message);
    return res.redirect('/article');
  }
  ArticleModel.create(article).then((result) => { req.flash('success', '文章发表成功'); return res.redirect(`/article/id=${result._id}`); });
  // ArticleModel.create(article)
  //   .then(function (error, result) {
  //     if (error) console.error(result + '不会是我？？？')  //如果要用这一段代码 ，就需要把这个函数中的error参数去掉，因为使用then之后，就不再有error这个参数了，具体的需要看promise
  //     req.flash('success', '文章发表成功')
  //     return res.redirect('/article')
  //   })
});

module.exports = router;
