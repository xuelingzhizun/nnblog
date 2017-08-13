const express = require('express');
const mongoose = require('mongoose');

const check = require('../models/check');

const ArticleModel = mongoose.model('article');
const UserModel = mongoose.model('users');
const MessageModel = mongoose.model('message');

const router = express.Router();

// 点击头像展示 特定作者的所有文章summary方式展示
router.post('/', check.NeedLogin, (req, res) => {
  const articleid = req.fields.articleid.match(/\w{24}/); // 获取留言时所在页面的文章的id  由ajax提交
  const message = {
    mesauthor: req.session.user._id,
    belongarticle: articleid,
    mescontent: req.fields.mescontent,
  };


  MessageModel
    .create(message)
    .then((recdata) => {
      UserModel
        .findOne({ _id: message.mesauthor })
        .then((recdata2) => {
          const recdata3 = {
            icon: recdata2.icon,
            mescontent: recdata.mescontent,
          };
          res.send(recdata3);
        });
    });
});


module.exports = router;
