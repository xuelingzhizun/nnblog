function connect(mongoose, config) {
  mongoose.Promise = global.Promise; // 消除 mongoose 的promise 替换警告，至于为什么有这个警告不清楚
  mongoose.connect(config.mongodb);

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    // yay!
    console.log('connect success');
  });
}

module.exports = connect;
