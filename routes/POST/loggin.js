const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Utilisateur } = require('../../config/dbconnect');

router.post('/loggin', async (req, res) => {
    try {
        const { pseudo, pwd } = req.body;

        if (!pseudo || !pwd) {
            return res.status(400).json({ message: 'Veuillez fournir un pseudo et un mot de passe' });
        }

        const utilisateur = await Utilisateur.findOne({ where: { pseudo } });

        if (!utilisateur) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        const passwordMatch = await bcrypt.compare(pwd, utilisateur.pwd);

        if (passwordMatch) {
            // Creation de la session avec les données utilisateur
            req.session.utilisateur = utilisateur.dataValues;
            console.log(req.session.utilisateur);
            return res.json({ message: 'Authentification réussie', identifie: true });
        } else {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }
    } catch (error) {
        console.error('Erreur lors de l\'authentification :', error);

      
        if (error.name === 'SequelizeDatabaseError') {
            return res.status(500).json({ error: 'Erreur de base de données lors de l\'authentification' });
        }

        return res.status(500).json({ error: 'Erreur lors de l\'authentification' });
    }
});

module.exports = router;
