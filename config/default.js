module.exports = {
  name: 'eblog',
  description: '学习express使用的多人博客',
  port: 3000,
  session: {
    secret: 'eblog',
    key: 'eblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/eblog'
}
