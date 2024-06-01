const express = require('express');
const router = express.Router();
const { Score } = require('../../config/dbconnect');
const CheckAuth = require('../../config/controller/CheckAuth');

// Définir la correspondance entre l'identifiant de la question et le nombre de points
const pointsDifficulte = {
    '1': 1, // Facile
    '2': 2, // Moyen
    '3': 3  // Difficile
};

router.post('/endQuizUpdate/:id_quiz/:id_user/:id_score', CheckAuth, async function(req,res){
        try {
            const pseudoUtilisateur = req.session.utilisateur.pseudo;
            const idQuiz = req.params.id_quiz;
            const idUser = req.params.id_user;
            const idScore = req.params.id_score;
            if(!idQuiz || !idUser || !idScore) {
                const error = "paramètres incomplet ou incorrect" ;
                return res.render('home/Error', {error,pseudoUtilisateur});
            }
            let score = 0;
    
            const formData = req.body;

            for (const questionId in formData) {
                const [difficult, reponse] = formData[questionId];
                const points = pointsDifficulte[difficult];
                if (reponse === 'true') {
                    score += points;
                }
            }

    
            const newScrore =
            {
                total: score,
                id_quiz: idQuiz,
                id_user: idUser
            };
             await Score.update(newScrore, {where:{id_score:idScore}});
    
            console.log('Score intégré avec succés !');
            res.redirect('/home')
        } catch (err) {
            console.error('Erreur lors de l\'insertion score :', err);
            const error = "Erreur lors de la validation du score" ;
            return res.render('home/Error', {error,pseudoUtilisateur});
        }
    });
    
    module.exports = router;