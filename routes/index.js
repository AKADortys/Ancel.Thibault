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
router.post('/sign-in',function (req,res) {
        // Affichez les données reçues dans la console du serveur
        console.log('Données reçues sur /sign-in:', req.body);

        // Répondez au client avec les données reçues
        res.json({ message: 'Données reçues avec succès!' });
});
router.post('/loggin',function(req,res) {
    console.log('Données recues sur /loggin:', req.body);
    res.json({ message: 'Données recues avec succès!'});
})

module.exports = router;