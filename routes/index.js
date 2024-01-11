const express = require('express')
const router = express.Router()

router.get('/home',function(req, res) {
    res.render('home/index');
});
router.get('/login',function(res,req){
    res.render('login/login');
});
module.exports = router;