const express = require('express');
const router = express.Router();
const { Utilisateur } = require('../../config/dbconnect');

router.get('/login', function (req, res) {
    res.render('login/login');
  });

module.exports = router;