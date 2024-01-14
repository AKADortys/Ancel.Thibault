const express = require('express');
const router = express.Router();
const db = require('../config/dbconnect');

router.get('/home', function (req, res) {
    res.render('home/index');
});
router.get('/login', function (res, req) {
    res.render('login/login');
});
router.get('/users', function (res,req) {
    db.query('SELECT * FROM utilisateur', (error, results, fields) => {
        if (error) {
            console.error('Erreur lors de la requête : ' + error.stack);
            return;
        }
        console.log('Résultats de la requête :', results);
    });
    db.end();
})

module.exports = router;