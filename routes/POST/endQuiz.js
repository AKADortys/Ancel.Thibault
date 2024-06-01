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

router.post('/endQuiz/:id_quiz/:id_user', CheckAuth, async function (req, res) {
    const pseudoUtilisateur = req.session.utilisateur.pseudo;
    try {
        const idQuiz = req.params.id_quiz;
        const idUser = req.params.id_user;
        let score = 0;

        const formData = req.body;
        for (const questionId in formData) {
            const [difficult, reponse] = formData[questionId];
            const points = pointsDifficulte[difficult];
            if (reponse === 'true') {
                score += points;
            }
        }

        const newScrore = await Score.create({
            total: score,
            id_quiz: idQuiz,
            id_user: idUser
        });

        console.log('Score intégré avec succés !');
        res.redirect('/home')
    } catch (err) {

        console.error('Erreur lors de l\'insertion score :', err);
        if (err.name === 'SequelizeValidationError') {
            const error = "Erreur de validation" ;
            return res.render('home/Error', {error,pseudoUtilisateur});
        }
        const error = "Une erreur s'est produite lors de la validation du scrore" ;
        return res.render('home/Error', {error,pseudoUtilisateur});
    }
});

module.exports = router;
