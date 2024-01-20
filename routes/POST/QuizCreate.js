const express = require('express');
const router = express.Router();
const { Quiz } = require('../../config/dbconnect');

router.post('/QuizCreate', async (req, res) => {
  try {
    const { titre, description } = req.body;

    if (!titre || !description) {
      return res.status(400).json({ message: 'Veuillez fournir un titre et une description pour le quiz' });
    }

    const newQuiz = await Quiz.create({
      titre,
      description
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
