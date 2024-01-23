const express = require('express');
const router = express.Router();
const { Categorie, Quiz, Question, Reponse } = require('../../config/dbconnect');

router.post('/deleteCategory/:id', async function(req, res) {
  const categoryId = req.params.id;
  
  if (!req.session.utilisateur) {
    return res.status(401).json({ message: 'Vous n\'êtes pas authentifié' });
  }

  const idUser = req.session.utilisateur.id_user;
  const isAdmin = req.session.utilisateur.admin;

  // Vérifier si l'utilisateur est un administrateur
  if (!isAdmin) {
    return res.status(403).json({ message: 'Vous n\'avez pas les autorisations nécessaires pour créer une catégorie' });
  }

  try {
    // Trouver les quizzes associés à la catégorie
    const quizzes = await Quiz.findAll({
      where: { id_categ: categoryId },
    });

    // Supprimer les questions et les réponses associées à chaque quiz
    for (const quiz of quizzes) {
      const questions = await Question.findAll({
        where: { id_quiz: quiz.id_quiz },
      });

      for (const question of questions) {
        await Reponse.destroy({
          where: { id_question: question.id_question },
        });
      }

      await Question.destroy({
        where: { id_quiz: quiz.id_quiz },
      });
    }

    // Supprimer les quizzes associés à la catégorie
    await Quiz.destroy({
      where: { id_categ: categoryId },
    });

    // Supprimer la catégorie elle-même
    await Categorie.destroy({
      where: { id_categ: categoryId },
    });

    res.redirect('/profil'); // Rediriger vers la page de profil après la suppression
  } catch (error) {
    console.error('Erreur lors de la suppression de la catégorie :', error);
    res.status(500).send('Erreur lors de la suppression de la catégorie');
  }
});

module.exports = router;
