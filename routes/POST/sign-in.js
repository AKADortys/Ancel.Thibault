const express = require('express');
const router = express.Router();
const { Utilisateur } = require('../../config/dbconnect');

router.post('/sign-in', async (req, res) => {
  try {
    const { pseudo, pwd,pwdConf, admin, nom, prenom, mail } = req.body;


    if(pwd !== pwdConf){return res.send('Les mot de passe doivent être identiques')};

    // Vérifier si toutes les informations nécessaires sont fournies dans la requête
    if (!pseudo || !pwd  || !mail) {
      return res.status(400).json({ message: 'Veuillez fournir toutes les informations nécessaires' });
    }

    // Créer un nouvel utilisateur dans la base de données
    const utilisateur = await Utilisateur.create({
      pseudo,
      pwd,
      mail,
      admin,
      nom,
      prenom
    });

    // Ajout des informations utilisateur dans la session
    req.session.utilisateur = utilisateur.dataValues;
    res.redirect('/home');

  } catch (error) {
    console.error('Erreur lors de l\'insertion de l\'utilisateur :', error);

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: 'Erreur de validation des données de l\'utilisateur' });
    }

    res.status(500).json({ error: 'Erreur lors de l\'insertion de l\'utilisateur' });
  }
});

module.exports = router;
