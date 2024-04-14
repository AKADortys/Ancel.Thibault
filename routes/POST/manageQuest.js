const express = require('express');
const router = express.Router();
const { Question, Reponse } = require('../../config/dbconnect');
const CheckAuth = require('../../config/script/CheckAuth');

router.post('/manageQuest/:id', CheckAuth, async function (req, res) {
    const idQuestion = req.params.id;
    const isAdmin = req.session.utilisateur.admin;

    // Vérifier si l'utilisateur est un administrateur
    if (!isAdmin) {
        return res.status(403).json({ message: 'Vous n\'avez pas les autorisations nécessaires pour supprimer un quiz' });
    }

    const formDataQuest = {
        Intitule: req.body.questInti,
        difficulte: req.body.questDiff,
        id_quiz: req.body.quiz
    };

    const formDataRepCorrect = { reponse: req.body.questRep };
    const formDataRepIncc = { reponse: req.body.questRep1 };
    const formDataRepIncc1 = { reponse: req.body.questRep2 };

    console.log(formDataRepIncc)
    console.log(formDataRepIncc1)
    console.log(formDataQuest)

    try {
        // Mettre à jour la question
        await Question.update(formDataQuest, { where: { id_question: idQuestion } });

        // Mettre à jour la réponse correcte
        await Reponse.update(formDataRepCorrect, { where: { id_question: idQuestion, correct: true } });

        // Trouver les réponses incorrectes associées à la question
        const incorrectResponses = await Reponse.findAll({
            where: { id_question: idQuestion, correct: false }
        });

        // Mettre à jour chaque réponse incorrecte spécifiquement
        if (incorrectResponses && incorrectResponses.length >= 2) {
            await Reponse.update(formDataRepIncc, { where: { id_reponse: incorrectResponses[0].id_reponse } });
            await Reponse.update(formDataRepIncc1, { where: { id_reponse: incorrectResponses[1].id_reponse } });
        }
        
        res.redirect('/profil');
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la question et des réponses :', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la question et des réponses.' });
    }
});

module.exports = router;
