var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  console.log('nihao')
  res.send('niaho')
  res.end()
})

router.get('/tes/', function (req, res) {
  console.log('nihao')
  res.send('niaho')
  res.end()
})

router.get('/:username/:title/:id', function (req, res) {
  var result = {
    name: req.params.username,
    title: req.params.title,
    id: req.params.id
  }
  var i = 0
  console.log('.....................' + i++ + '...........................')
  console.log(result)
  console.log('...................................................')
  res.end()
})

module.exports = router
