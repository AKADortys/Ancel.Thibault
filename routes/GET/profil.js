const express = require('express');
const router = express.Router();


router.get('/profil', function(req,res) {
    res.render('home/profil');
  })

  
module.exports = router;