const express = require('express');

const router = express.Router();

// 首页
router.get('/*', (req, res) => {
    console.log(res.headersSent)
  if (!res.headersSent) {
    res.status(404).render('404');
  }
});

module.exports = router;
