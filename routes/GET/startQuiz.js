const express = require('express');
const router = express.Router();
const { Question, Reponse, Quiz } = require('../../config/dbconnect');

// Route pour démarrer un nouveau quiz
router.get('/startQuiz/:id', async (req, res) => {
    try {
        const idQuiz = req.params.id;
        const pseudoUtilisateur = req.session.utilisateur.pseudo
        // Étape 1 : Récupération des paramètres de Quiz (questions)
        const quiz = await Quiz.findByPk(idQuiz);

        const questionQuiz = await Question.findAll({ where: { id_quiz: idQuiz } });

        const question_Reponse_Table = [];

        // Étape 2 : Interrogation de la base de données pour récupérer les questions 
        for (const question of questionQuiz) {
            // récupérer les réponses associées à la question
            const reponses = await Reponse.findAll({ where: { id_question: question.id_question } });

            // Construction de l'objet question avec ses réponses associées
            const questionData = {
                id: question.id_question,
                text: question.Intitule,
                difficulte: question.difficulte,
                reponses: reponses.map(reponse => {
                    return {
                        id: reponse.id_reponse,
                        text: reponse.reponse,
                        correct: reponse.correct
                    };
                })
            };

            // Ajout de l'objet question dans le tableau questionsWithAnswers
            question_Reponse_Table.push(questionData);
        }

        // À ce stade, questionsWithAnswers contient toutes les questions avec leurs réponses associées

        // Vous pouvez maintenant procéder aux autres étapes du quiz
        // ...

        // Enfin, vous pouvez passer les questions avec leurs réponses associées à votre template pour affichage
        res.render('home/startQuiz', {question_Reponse_Table, quiz, pseudoUtilisateur});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;
