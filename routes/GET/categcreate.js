const express = require('express');
const router = express.Router();

router.get('/categcreate', function (req,res) {
    res.render('login/usercreatecateg');
  })
  

module.exports = router;