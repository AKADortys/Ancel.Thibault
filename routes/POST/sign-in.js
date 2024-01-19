const express = require('express');
const router = express.Router();
const { Utilisateur } = require('../../config/dbconnect');




router.post('/sign-in', async (req, res) => {
  try {
    const { pseudo, pwd, admin, nom, prenom } = req.body;

    const utilisateur = await Utilisateur.create({
      pseudo,
      pwd,
      admin,
      nom,
      prenom
    });
    //ajout des informations utilisateur dans session
    req.session.utilisateur = utilisateur.dataValues;
    console.log(req.session.utilisateur);
    res.status(201).json({ message: 'Utilisateur inséré avec succès', utilisateur });

  } catch (error) {
    console.error('Erreur lors de l\'insertion de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de l\'insertion de l\'utilisateur' });
  }
});


module.exports = router;
