const express = require('express');
const router = express.Router();
const { Question, Reponse } = require('../../config/dbconnect');
const CheckAuth = require('../../config/controller/CheckAuth');

router.post('/manageQuest/:id', CheckAuth, async function (req, res) {
const pseudoUtilisateur = req.session.utilisateur.pseudo; 
    try {
        const idQuestion = req.params.id;
        if(!idQuestion){
            const error = "paramètres manquants" ;
            return res.render('home/Error', {error,pseudoUtilisateur});
        }
        const isAdmin = req.session.utilisateur.admin;
    
        // Vérifier si l'utilisateur est un administrateur
        if (!isAdmin) {
            const error = "Vous n'avez pas les autorisations requisent" ;
            return res.render('home/Error', {error,pseudoUtilisateur});
        }
    
        const formDataQuest = {
            Intitule: req.body.questInti,
            difficulte: req.body.questDiff,
            id_quiz: req.body.quiz
        };
    
        const formDataRepCorrect = { reponse: req.body.questRep };
        const formDataRepIncc = { reponse: req.body.questRep1 };
        const formDataRepIncc1 = { reponse: req.body.questRep2 };

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
    } catch (err) {
        console.error('Erreur lors de la mise à jour de la question et des réponses :', err);
        const error = "Erreur lors de la mise à jour de la question" ;
        return res.render('home/Error', {error,pseudoUtilisateur});
    }
});

module.exports = router;
