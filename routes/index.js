const express = require('express');
const router = express.Router();
const db = require('../config/dbconnect');

router.get('/home', function (req, res) {
    res.render('home/index');
});

router.get('/login', function (req, res) {
    res.render('login/login');
});

router.get('/users', function (req, res) {
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