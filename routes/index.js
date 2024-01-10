const express = require('express')
const router = express.Router()

router.get('/index',function(req, res) {
    res.render('pages/index');
});
module.exports = router;