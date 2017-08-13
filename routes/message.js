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
  
  // 保存message（留言）到数据库
  MessageModel
    .create(message)
    .then((recdata) => {
      // 更新留言的_id 到 所属文章中
      ArticleModel
        .update({ _id: message.belongarticle }, { $addToSet: { messages: recdata._id } })
        .then((result)=>{console.log(result)});
      // 跟新留言的_id 到所属用户中，而且根据文章id找到该用户，从该用户中获取icon，作为此刻留言的头像
      UserModel
        .update({ _id: message.mesauthor }, { $addToSet: { messages: recdata._id } })
        .findOne({ _id: message.mesauthor })
        .then((recdata2) => {
          const recdata3 = { // 之所以添加这个变量，是为了添加icon这个对象属性，因为直接在recdata上面没法赋值属性，我也不知道为什么
            icon: recdata2.icon,
            mescontent: recdata.mescontent,
          };
          res.send(recdata3);
        });
    });
});

module.exports = router;
