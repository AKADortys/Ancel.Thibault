const express = require('express');
const router = express.Router();
const { Utilisateur, Categorie, Quiz } = require('../config/dbconnect');
const bcrypt = require('bcrypt');


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

    res.status(201).json({ message: 'Utilisateur inséré avec succès', utilisateur });

  } catch (error) {
    console.error('Erreur lors de l\'insertion de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de l\'insertion de l\'utilisateur' });
  }
});

router.post('/loggin', async (req, res) => {
  try {
    const { pseudo, pwd } = req.body;

    const utilisateur = await Utilisateur.findOne({ where: { pseudo } });

    if (!utilisateur) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    const passwordMatch = await bcrypt.compare(pwd, utilisateur.pwd);

    if (passwordMatch) {
      res.json({ message: 'Authentification réussie' });
    } else {
      res.status(401).json({ message: 'Identifiants invalides' });
    }
  } catch (error) {
    console.error('Erreur lors de l\'authentification :', error);
    res.status(500).json({ error: 'Erreur lors de l\'authentification' });
  }
});

router.post('/QuizCreate', async (req, res) => {
  try {
    const { titre, description } = req.body;
    const newQuiz = await Quiz.create({
      titre,
      description
    });

res.status(201).json({ message: 'Nouveau quiz créer !', newQuiz})
  }  catch(error) {
    console.error('Erreur lors de l\'insertion du quiz :', error);
    res.status(500).json({ error: 'Erreur lors de l\'insertion du quiz' });
  }
});

module.exports = router;
