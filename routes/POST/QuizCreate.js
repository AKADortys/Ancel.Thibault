const express = require('express');
const router = express.Router();



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
