function user(mongoose) {
  const userSchema = new mongoose.Schema({
    name: { type: 'string' },
    password: { type: 'string' },
    email: { type: 'string' },
    icon: { type: 'string' }, // 头像
    profile: { type: 'string' }, // 简介
    date: { type: Date, default: Date.now },
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'article' }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'message' }],
  });

  const UserModel = mongoose.model('users', userSchema);
  return UserModel;
}

function article(mongoose) {
  const articleSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }, // 待修改             
    title: { type: 'string' },
    summary: { type: 'string' },
    content: { type: 'string' }, // 内容
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'message' }],
    date: { type: Date, default: Date.now },
    pv: { type: 'number' },

  });

  const articleModel = mongoose.model('article', articleSchema);
  return articleModel;
}

function message(mongoose) {
  const messageSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    arctitle: { type: mongoose.Schema.Types.ObjectId, ref: 'article' },
    content: { type: 'string' },
    date: { type: Date, default: Date.now },
  });

  const MessageModel = mongoose.model('message', messageSchema);
  return MessageModel;
}
module.exports = {
  user,
  article,
  message,
};

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