const express = require('express');
const router = express.Router();
const { Question, Reponse, Quiz, Utilisateur, Score } = require('../../config/dbconnect');
const utilisateur = require('../../model/utilisateur');

// Route pour démarrer un nouveau quiz
router.get('/startQuiz/:id', async (req, res) => {
    try {
        const idUser = req.session.utilisateur.id_user
        const idQuiz = req.params.id;
        const pseudoUtilisateur = req.session.utilisateur.pseudo;

        const infoUtilisateur = 
        {
            pseudo: req.session.utilisateur.pseudo,
            id_user: req.session.utilisateur.id_user

        };

        // Étape 1 : Récupération des paramètres de Quiz (questions)
        const scoreUser = await Score.findOne({where:{ id_user:idUser, id_quiz: idQuiz}});

        const quiz = await Quiz.findByPk(idQuiz);
        // console.log(quiz);

        const questionQuiz = await Question.findAll({ where: { id_quiz: idQuiz } });

        const utilisateurQuiz = await Utilisateur.findByPk(quiz.id_user);


        //récupérer le pseudo du créateur de quiz
        const pseudoCreateur = utilisateurQuiz.pseudo;

        // Convertir la date en objet Date
        const dateAjout = new Date(quiz.date_ajout);

        // Formater la date au format européen (dd/mm/yyyy)
        const formattedDate = `${dateAjout.getDate().toString().padStart(2, '0')}/${(dateAjout.getMonth() + 1).toString().padStart(2, '0')}/${dateAjout.getFullYear()}`;

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

            // Ajout de l'objet question dans le tableau
            question_Reponse_Table.push(questionData);
        }
        res.render('home/startQuiz', { pseudoUtilisateur,question_Reponse_Table, quiz, infoUtilisateur,formattedDate, pseudoCreateur, scoreUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;
