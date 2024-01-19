const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Utilisateur } = require('../../config/dbconnect');

router.post('/loggin', async (req, res) => {
    try {
      const { pseudo, pwd } = req.body;
  
      const utilisateur = await Utilisateur.findOne({ where: { pseudo } });
  
      if (!utilisateur) {
        return res.status(401).json({ message: 'Identifiants invalides' });
      }
  
      const passwordMatch = await bcrypt.compare(pwd, utilisateur.pwd);
  
      if (passwordMatch) {
        //creation de la session avec les données utilisateur
        req.session.utilisateur = utilisateur.dataValues;
        console.log(req.session.utilisateur);
        res.json({ message: 'Authentification réussie',identifie: true });
      } else {
        res.status(401).json({ message: 'Identifiants invalides' });
      }
    } catch (error) {
      console.error('Erreur lors de l\'authentification :', error);
      res.status(500).json({ error: 'Erreur lors de l\'authentification' });
    }
  });
  

module.exports = router;