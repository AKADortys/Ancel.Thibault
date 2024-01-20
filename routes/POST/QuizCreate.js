const express = require('express');
const router = express.Router();
const { Quiz } = require('../../config/dbconnect');

router.post('/QuizCreate', async (req, res) => {
  try {
    const { titre, description } = req.body;

    // Vérifier si la session de l'utilisateur existe
    if (!req.session.utilisateur) {
      return res.status(401).json({ message: 'Vous n\'êtes pas authentifié' });
    }

    const idUser = req.session.utilisateur.id_user;
    const isAdmin = req.session.utilisateur.admin;

    // Vérifier si l'utilisateur est un administrateur
    if (!isAdmin) {
      return res.status(403).json({ message: 'Vous n\'avez pas les autorisations nécessaires pour créer un quiz' });
    }

    if (!titre || !description) {
      return res.status(400).json({ message: 'Veuillez fournir un titre et une description pour le quiz' });
    }

    const newQuiz = await Quiz.create({
      titre,
      description,
      id_user: idUser 
    });

    res.status(201).json({ message: 'Nouveau quiz créé avec succès !', newQuiz });

  } catch (error) {
    console.error('Erreur lors de l\'insertion du quiz :', error);

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: 'Erreur de validation des données du quiz' });
    }

    res.status(500).json({ error: 'Erreur lors de l\'insertion du quiz' });
  }
});

module.exports = router;
