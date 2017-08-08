// var fs = require('fs')
// var path = require('path')
const express = require('express');

const router = express.Router();
// 首页
router.get('/', (req, res) => {
//   var filepath = (__dirname).split(path.sep)
//   filepath.pop()
// // console.log(filepath)
//   var i = 0
//   var filepath2 = path.resolve(filepath[i++])
//   fs.readdir(filepath2 + '/public', function (err, data) {
//     if (err) throw err
//     // console.log(data)
//     var fileurl = path.resolve('/', data[i++])
//     res.render('fileshow', data)
//   })
});

module.exports = router;
