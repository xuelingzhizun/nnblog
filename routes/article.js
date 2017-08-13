const express = require('express');

const router = express.Router();
const check = require('../models/check');
const mongoose = require('mongoose');

const UserModel = mongoose.model('users');
const ArticleModel = mongoose.model('article');
const MessageModel = mongoose.model('message');


// 点击头像展示 特定作者的所有文章summary方式展示
router.get('/author=*', check.NeedLogin, (req, res) => { // 此处路由所使用的正则表达式和js默认的方式所展现的情况似乎不同 
  const reqauthor = req.params[0]; // 从路由中获取author= 后面的参数
  // 根据作者 账号名称  查找所有的所属文章
  // author: { type: mongoose.Schema.Types.Object, ref: 'users' }, // 待修改
  //     title: { type: 'string' },
  //     summary: { type: 'string' },
  //     content: { type: 'string' }, // 内容
  //     messages: [{ type: mongoose.Schema.Types.Object, ref: 'message' }],
  //     date: { type: Date, default: Date.now },
  //     pv: { type: 'number' },

  UserModel
    .findOne({ name: reqauthor })
    .populate({ path: 'articles', select: 'title summary content' })
    .then((recdata) => {
      try {
        if (!recdata) throw new Error('该作者未曾发表文章');
      } catch (e) {
        req.flash('error', e.message);
        return res.redirect('/');
      }
      if (recdata) {
        const renderdata = [];
        let i = 0;
        recdata.articles.forEach((data) => { // 把获取到users数据转换成数组形式
          renderdata[i] = { // 原来是 {name：‘xx’,
            name: reqauthor, //        icon: 'xxx',     
            icon: recdata.icon, //        articles:[
            profile: recdata.profile, //                  {title:'xx',summary:'xxx'}
            _id: data._id, //                  {title:'xx',summary:'xxx'}
            title: data.title, //                  {title:'xx',summary:'xxx'}
            summary: data.summary, //                 ]
            content: data.content, // 现在是 renderdata = [
          }; //                     {name:'xx',icon:'xx',title:'xx',summary:'xxx'}
          i += 1; //                     {name:'xx',icon:'xx',title:'xx',summary:'xxx'}
        }); //                    ]   为的是统一渲染网页的数据形式 
        res.render('author_summary', { res: renderdata });
      }
    });
});

// 根据文章存储自动生成的_id 来寻找文章  主要用于发表完文章后自动跳转到已发表文章页
router.get('/id=*', check.NeedLogin, (req, res) => { // 此处路由所使用的正则表达式和js默认的方式所展现的情况似乎不同 
<<<<<<< HEAD
  if (req.params[0].length !== 24) return res.redirect('/404'); // 如果输入的id的位数不是24位，就跳转到404页面
=======
  if(req.params[0].length!==24) {
    req.flash('error', '没有找到此篇文章');
    return res.redirect('/');
  }
>>>>>>> tmain
  ArticleModel
    .findOne({ _id: req.params[0] })
    .populate({ path: 'author', select: 'name icon profile' })
    .then((recdata) => {
      try {
        if (!recdata) throw new Error('链接文章失败：没有找到该文章');
      } catch (e) {
        req.flash('error', e.message);
        return res.redirect('/');
      }
      if (recdata) {
        MessageModel
          .find({ belongarticle: req.params[0] })
          .populate({ path: 'mesauthor', select: 'icon' })
          .then((recdata2) => {
            const messages = [];
            let i = 0;
            recdata2.forEach((message) => {
              messages[i] = { // 有一个疑问，为什么必须用大括号的形式，而不能使用分开赋值的方式：message[i].mesicon:message.mesauthor.iocn; message[i].mescontent: message.mescontent,
                mesicon: message.mesauthor.icon,
                mescontent: message.mescontent,
              };
              i += 1;
            });

            const renderdata = {
              name: recdata.author.name,
              icon: recdata.author.icon,
              profile: recdata.author.profile,
              title: recdata.title,
              summary: recdata.summary,
              content: recdata.content,
            };
            res.render('article', {
              res: renderdata,
              message: messages,
            });
          });
      }
    });
});

// 文章发表 接受提交的文章数据并在校验后存储到数据库
router.post('/', check.NeedLogin, (req, res) => {
  const article = {
    author: req.session.user._id,
    title: req.fields.title,
    summary: req.fields.summary,
    content: req.fields.content,
  };
  //   author: { type: mongoose.Schema.Types.Object, ref: 'users' }, // 待修改
  //   title: { type: 'string' },
  //   summary: { type: 'string' },
  //   content: { type: 'string' }, // 内容
  //   messages: [{ type: mongoose.Schema.Types.Object, ref: 'message' }],
  //   date: { type: Date, default: Date.now },
  //   pv: { type: 'number' },
  try {
    if (!article.title) throw new Error('未填写标题');
    if (!article.summary) throw new Error('未填写摘要');
    if (!article.content) throw new Error('未填写正文内容');
  } catch (error) {
    req.flash('error', error.message);
    return res.redirect('/article');
  }

  ArticleModel
    .create(article)
    .then(
      (recdata) => {
        req.flash('success', '文章发表成功');
        UserModel
          // 根据当前用户也就是发表文章的用户的_id查找到该用户的document，并在其document中的articles里添加此次被发表的文章的_id；
          // 由于一个用户可能发表多篇文档，所以用户的articles是一个数组，故用$addToSet为其更新数据
          .update({ _id: req.session.user._id }, { $addToSet: { articles: recdata._id } })
          .then(rec => console.log(rec)); // 这一句没有了上一句就不能更新，我也不知道为什么，另外rec的结果也有点匪夷所思，需要假以时日认真读mongoose的API
        return res.redirect(`/article/id=${recdata._id}`);
      },
    );
});

module.exports = router;
