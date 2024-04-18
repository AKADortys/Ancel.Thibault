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
            const idQuiz = req.params.id_quiz;
            const idUser = req.params.id_user;
            const idScore = req.params.id_score;
            let score = 0;
    
            const formData = req.body;
            console.log(formData);
            for (const questionId in formData) {
                const [difficult, reponse] = formData[questionId];
                const points = pointsDifficulte[difficult];
                if (reponse === 'true') {
                    score += points;
                }
            }
            console.log(score);
    
            const newScrore =
            {
                total: score,
                id_quiz: idQuiz,
                id_user: idUser
            };
             await Score.update(newScrore, {where:{id_score:idScore}});
    
            console.log('Score intégré avec succés !', newScrore);
            res.redirect('/home')
        } catch (error) {
    
            console.error('Erreur lors de l\'insertion score :', error);
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({ error: 'Erreur de validation des données du score' });
            }
    
            res.status(500).json({ error: 'Erreur lors de l\'insertion du score' });
        }
    });
    
    module.exports = router;