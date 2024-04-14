const express = require('express');
const router = express.Router();
const { Categorie, Quiz, Question, Reponse } = require('../../config/dbconnect');
const fs = require('fs').promises;
const path = require('path');
const CheckAuth = require('../../config/script/CheckAuth');

router.post('/deleteCategory/:id', CheckAuth, async function (req, res) {
  const categoryId = req.params.id;
  const idUser = req.session.utilisateur.id_user;
  const isAdmin = req.session.utilisateur.admin;

  // Vérifier si l'utilisateur est un administrateur
  if (!isAdmin) {
    return res.status(403).json({ message: 'Vous n\'avez pas les autorisations nécessaires pour supprimer une catégorie' });
  }

  try {
    // Trouver la catégorie pour obtenir le chemin de l'image
    const categorie = await Categorie.findByPk(categoryId);

    if (!categorie) {
      return res.status(404).json({ message: 'La catégorie n\'existe pas' });
    }

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

      // Supprimer l'image du quiz
      await deleteImage(quiz.image);

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

    res.redirect('/profil');
  } catch (error) {
    console.error('Erreur lors de la suppression de la catégorie :', error);
    res.status(500).send('Erreur lors de la suppression de la catégorie');
  }
});

// Fonction pour supprimer une image
async function deleteImage(imagePath) {
  try {
    // Supprimer l'image avec le chemin donné
    await fs.unlink(path.join(__dirname, '../..', imagePath));
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'image :', error);
  }
}

module.exports = router;
