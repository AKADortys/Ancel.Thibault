const express = require('express');
const router = express.Router();
const { Quiz, Question, Reponse } = require('../../config/dbconnect');
const fs = require('fs').promises;
const path = require('path');

router.post('/deleteQuiz/:id', async function (req, res) {
    const quizId = req.params.id;

    if (!req.session.utilisateur) {
        return res.status(401).json({ message: 'Vous n\'êtes pas authentifié' });
    }

    const idUser = req.session.utilisateur.id_user;
    const isAdmin = req.session.utilisateur.admin;

    // Vérifier si l'utilisateur est un administrateur
    if (!isAdmin) {
        return res.status(403).json({ message: 'Vous n\'avez pas les autorisations nécessaires pour supprimer un quiz' });
    }

    try {
        const quiz = await Quiz.findByPk(quizId);

        if (!quiz) {
            return res.status(404).json({ message: 'Le quiz n\'existe pas' });
        }

        const imagePath = quiz.image;

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
    } catch (error) {
        console.error('Erreur lors de la suppression du quiz :', error);
        res.status(500).send('Erreur lors de la suppression du quiz');
    }
});

module.exports = router;
