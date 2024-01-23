const express = require('express');
const router = express.Router();
const { Quiz, Question, Reponse } = require('../../config/dbconnect');

router.post('/deleteQuiz/:id', async function (req, res) {
    const quizId = req.params.id;

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
        const questions = await Question.findAll({
            where: { id_quiz: quizId },
        });

        // Supprimer les réponses associées à chaque question
        for (const question of questions) {
            await Reponse.destroy({
                where: { id_question: question.id_question },
            });
        }

        await Question.destroy({
            where: { id_quiz: quizId },
        });

        await Quiz.destroy({
            where: { id_quiz: quizId },
        });

        res.redirect('/profil');
    } catch (error) {
        console.error('Erreur lors de la suppression du quiz :', error);
        res.status(500).send('Erreur lors de la suppression du quiz');
    }
});

module.exports = router;
