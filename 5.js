var express = require('express')
var app = express()
app.param(['323232','322'], function (req, res, next, id) {
  console.log('CALLED ONLY ONCE')
  next()
})
app.get('/user/:323232', function (req, res, next) {
  console.log('although this matches')
  next()
})
app.get('/user/:322', function (req, res) {
  console.log('and this mathces too')
  res.end()
})
app.get('/user/:323232', function (req, res, next) {
  console.log('although this matches')
  next()
})
app.get('/user/:322', function (req, res) {
  console.log('and this mathces too')
  res.end()
})
app.get('/user/:323232', function (req, res, next) {
  console.log('although this matches')
  next()
})
app.get('/user/:322', function (req, res) {
  console.log('and this mathces too')
  res.end()
})
app.listen(3000, function () {
  console.log('Ready')
})

// var express = require('express')
// var app = express()

// app.param(function (param, validator) {
//   return function (req, res, next, val) {
//     if (validator(val)) {
//       next()
//     } else {
//       res.sendStatus(403)
//     }
//   }
// })

// app.param('id', function (candidate) {
//   return !isNaN(parseFloat(candidate)) && isFinite(candidate)
// })

// route to trigger the capture  
// app.get('/user/:id', function (req, res) {
//   res.send('OK')
// })

// app.listen(3000, function () {
//   console.log('Ready')
// })
