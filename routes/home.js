const express = require('express');
const mongoose = require('mongoose');

const UserModel = require('../models/mongooseSchema').user(mongoose);
const ArticleModel = require('../models/mongooseSchema').article(mongoose);

const router = express.Router();

// 首页
router.get('/', (req, res) => {
  // 查找所有的 不做任何条件限制 ，获得所有文章后显示在网站文章首页
  ArticleModel
    .find({})
    .populate({ path: 'author', select: 'name icon profile' })
    .then((recdata) => {
      try {
        if (!recdata) throw new Error('至今为止还没有任何文章被发表');
      } catch (e) {
        req.flash('error', e.message);
        return res.redirect('/');
      }
      if (recdata) {
        // 在已经确定有文章被发表的情况下，根据每篇文章的作者索取该作者的头像icon，然后添加到所返回的articles中，为文章缩略页的每篇文章提供头像
        const renderdata = [];
        let i = 0;
        recdata.forEach((data) => {
          renderdata[i] = {
            name: data.author.name,
            icon: data.author.icon,
            profile: data.author.profile,
            _id: data._id,
            title: data.title,
            summary: data.summary,
            content: data.content,
          };
          i += 1;
        });
        res.render('author_summary', { res: renderdata });
      }
    });
});

module.exports = router;
