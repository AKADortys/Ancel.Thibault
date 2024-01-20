const express = require('express');
const router = express.Router();
const { Utilisateur } = require('../../config/dbconnect');

router.post('/sign-in', async (req, res) => {
  try {
    const { pseudo, pwd, admin, nom, prenom, mail } = req.body;

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
    console.log(req.session.utilisateur);

    res.status(201).json({ message: 'Utilisateur inséré avec succès', utilisateur });

  } catch (error) {
    console.error('Erreur lors de l\'insertion de l\'utilisateur :', error);

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: 'Erreur de validation des données de l\'utilisateur' });
    }

    res.status(500).json({ error: 'Erreur lors de l\'insertion de l\'utilisateur' });
  }
});

module.exports = router;
