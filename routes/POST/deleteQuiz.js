const express = require('express');
const router = express.Router();
const { Quiz, Question, Reponse, Score } = require('../../config/dbconnect');
const fs = require('fs').promises;
const path = require('path');
const CheckAuth = require('../../config/controller/CheckAuth');

router.post('/deleteQuiz/:id', CheckAuth, async function (req, res) {
    const quizId = req.params.id;
    const isAdmin = req.session.utilisateur.admin;

    // Vérifier si l'utilisateur est un administrateur
    if (!isAdmin) {
        const error = "Vous n'avez pas les autorisation pour supprimer un quiz" ;
        return res.render('home/Error', {error,pseudoUtilisateur});
    }

    try {
        const quiz = await Quiz.findByPk(quizId);

        if (!quiz) {
            return res.status(404).json({ message: 'Le quiz n\'existe pas' });
        }

        const imagePath = quiz.image;

        await Score.destroy({
            where: {id_quiz: quizId}
        })

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

        // supprimer l'image avec l'url
        await fs.unlink(path.join(__dirname, '../..', imagePath));

        res.redirect('/profil');
    } catch (err) {
        console.error('Erreur lors de la suppression du quiz :', err);
        const error = "Une erreur s'est produit lors de la suppression" ;
        return res.render('home/Error', {error,pseudoUtilisateur});
    }
});

module.exports = router;
