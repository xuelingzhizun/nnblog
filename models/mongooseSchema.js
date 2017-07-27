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

function post (mongoose) {
  var postSchema = new mongoose.Schema({
    author: { type: 'string' }, // 待修改
    title: { type: 'string' },
    content: { type: 'string' }, // 内容
    date: { type: Date, default: Date.now },
    pv: { type: 'number' }

  })

  var PostModel = mongoose.model('users', postSchema)
  return PostModel
}

function commit (mongoose) {
  var commitSchema = new mongoose.Schema({
    author: { type: 'string' },
    content: { type: 'string' },
    date: { type: Date, default: Date.now },
    postId: { type: 'number' }

  })

  var CommitModel = mongoose.model('users', commitSchema)
  return CommitModel
}
module.exports = {
  user: user,
  post: post,
  commit: commit
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
