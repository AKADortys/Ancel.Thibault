const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Utilisateur } = require('../../config/dbconnect');

router.post('/loggin', async (req, res) => {
    try {
        const { pseudo, pwd } = req.body;

        if (!pseudo || !pwd) {
            const error = "Mot de passe ou pseudo manquant" ;
            const pseudoUtilisateur = ''
            return res.render('home/Error', {error,pseudoUtilisateur});
        }

        const utilisateur = await Utilisateur.findOne({ where: { pseudo } });

        if (!utilisateur) {
            const error = "Identifiants invalides" ;
            const pseudoUtilisateur = ''
            return res.render('home/Error', {error,pseudoUtilisateur});
        }

        const passwordMatch = await bcrypt.compare(pwd, utilisateur.pwd);

        if (passwordMatch) {
            // Creation de la session avec les données utilisateur
            req.session.utilisateur = utilisateur.dataValues;
            console.log(`Utilisateur ${pseudo} connecté.`);
            return res.redirect('/home')
        } else {
            const error = "Identifiants invalides" ;
            return res.render('home/Error', {error,pseudoUtilisateur});
        }
    } catch (err) {
        console.error('Erreur lors de l\'authentification :', err);
        const error = "Erreur lors de l'authentification" ;
        const pseudoUtilisateur = ''
        return res.render('home/Error', {error,pseudoUtilisateur});
    }
});

module.exports = router;
