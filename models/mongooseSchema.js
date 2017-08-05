function user (mongoose) {
  var userSchema = new mongoose.Schema({
    name: {type: 'string'},
    password: {type: 'string'},
    email: {type: 'string'},
    icon: {type: 'string'}, // 头像
    profile: {type: 'string'} // 简介

  })

  var UserModel = mongoose.model('users', userSchema)
  return UserModel
}

function article (mongoose) {
  var articleSchema = new mongoose.Schema({
    author: { type: 'string' }, // 待修改
    title: { type: 'string' },
    summary: {type: 'string'},
    content: { type: 'string' }, // 内容
    date: { type: Date, default: Date.now },
    pv: { type: 'number' }

  })

  var articleModel = mongoose.model('article', articleSchema)
  return articleModel
}

function message (mongoose) {
  var messageSchema = new mongoose.Schema({
    author: { type: 'string' },
    content: { type: 'string' },
    date: { type: Date, default: Date.now },
    postId: { type: 'number' }

  })

  var MessageModel = mongoose.model('message', messageSchema)
  return MessageModel
}
module.exports = {
  user: user,
  article: article,
  message: message
}

/**
 var fluffy = new UserModel({
    name: 'liuxue',
    password: '370',
    avatar: 'm',
    gender: 'm',
    profile: 'good man'
  })

  fluffy.save(function (err, fluffy) {
    if (err) return console.error(err)
  })
 
  */
