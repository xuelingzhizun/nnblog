const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const UserModel = require('../models/mongooseSchema').user(mongoose);
const ArticleModel = require('../models/mongooseSchema').article(mongoose);

let render = {};
// 首页

router.get('/', (req, res) => {
  // 查找所有的文章 不做任何条件限制 ，获得所有文章后显示在网站文章首页
  ArticleModel.find({})
    .then((articles) => {
      try {
        if (!articles) throw new Error('至今为止还没有任何文章被发表');
      } catch (e) {
        req.flash('error', e.message);
        return res.redirect('/');
      }
      if (articles) {
        // 在已经确定有文章被发表的情况下，根据每篇文章的作者索取该作者的头像icon，然后添加到所返回的articles中，为文章缩略页的每篇文章提供头像
        render = articles;

        articles.forEach((article) => {
          UserModel.findOne({ name: article.author })
            .then(recdata => new Promise( // 把通过作者账户名获得的账户信息中的icon赋值给render容器
              (resolve) => { render.icon = recdata.icon; resolve(render); console.log(0); },
            ));
          console.log(1);
        });
        console.log(2);

        // 在已经确定有articles的情况下 查找该作者的icon
        // 赋值函数1，为了下文的then调用: 将articles(也就是通过作者查到的文章数组)赋值给result这个容器_resdata = recdata;
      }
    }).then(()=>console.log(9))
  console.log(render);
  // res.render('author_summary', { res: render });
});

module.exports = router;
