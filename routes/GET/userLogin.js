const express = require('express');
const router = express.Router();

router.get('/userLogin',function(req,res) {
    res.render('login/userLogin');
  });

  
module.exports = router;