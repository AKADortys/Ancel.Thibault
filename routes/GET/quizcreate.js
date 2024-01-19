const express = require('express');
const router = express.Router();

router.get('/quizcreate', function (req,res) {
    res.render('login/usercreatequiz');
  })
  

module.exports = router;