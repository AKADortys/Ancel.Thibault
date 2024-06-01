const express = require('express');
const router = express.Router();
const { Categorie, Quiz, Question, Reponse, Score } = require('../../config/dbconnect');
const fs = require('fs').promises;
const path = require('path');
const CheckAuth = require('../../config/controller/CheckAuth');

router.post('/deleteCategory/:id', CheckAuth, async function (req, res) {
  const pseudoUtilisateur = req.session.utilisateur.pseudo;
  const categoryId = req.params.id;
  const idUser = req.session.utilisateur.id_user;
  const isAdmin = req.session.utilisateur.admin;

  // Vérifier si l'utilisateur est un administrateur
  if (!isAdmin) {
    const error = "Vous n'avez pas les autorisation pour supprimer une catégorie" ;
    return res.render('home/Error', {error,pseudoUtilisateur});
  }

  try {
    // Trouver la catégorie pour obtenir le chemin de l'image
    const categorie = await Categorie.findByPk(categoryId);

    if (!categorie) {
      const error = "La categorie n'existe pas" ;
      return res.render('home/Error', {error,pseudoUtilisateur});
    }

    // Trouver les quizzes associés à la catégorie
    const quizzes = await Quiz.findAll({
      where: { id_categ: categoryId },
    });

    // Supprimer les questions, les scores et les réponses associées à chaque quiz
    for (const quiz of quizzes) {
      const questions = await Question.findAll({
        where: { id_quiz: quiz.id_quiz },
      });
      const scores = await Score.findAll({
        where: { id_quiz: quiz.id_quiz }
      })

      for (const score of scores) {
        await Score.destroy({
          where: { id_quiz: score.id_quiz },
        })
      }

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
  } catch (err) {
    console.error('Erreur lors de la suppression de la catégorie :', err);
    const error = "Erreur lors de la suppression de la catégorie" ;
    return res.render('home/Error', {error,pseudoUtilisateur});
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
