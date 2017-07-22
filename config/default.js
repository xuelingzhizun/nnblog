module.exports = {
  port: 3000,
  session: {
    secret: 'eblog',
    key: 'eblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/eblog'
}
