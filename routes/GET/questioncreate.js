const express = require('express');
const { Quiz } = require('../../config/dbconnect');
const router = express.Router();
const CheckAuth = require('../../config/controller/CheckAuth');

router.get('/questcreate', CheckAuth,async function (req, res) {
    //recupérer le pseudo utilisateur pour la nav bar
    const pseudoUtilisateur = req.session.utilisateur.pseudo;
    const isAdmin = req.session.utilisateur.admin;
    
    // Vérifier si l'utilisateur est un administrateur
    if (!isAdmin) {
        const error = "Vous n'avez pas les autorisation pour créer une question" ;
        return res.render('home/Error', {error,pseudoUtilisateur});
    }
    try {
        if (!req.session.utilisateur) { return res.redirect('/userLogin'); }
        const quiz = await Quiz.findAll();
        let selectQuiz = '<label for="quiz">Quiz :</label><select name="id_quiz" id="quiz">';
        quiz.forEach((quiz) => {
            selectQuiz += `<option value="${quiz.id_quiz}">${quiz.titre}</option>`;
        });
        selectQuiz += '</select>';
        res.render('login/usercreatequest', { selectQuiz, pseudoUtilisateur });
    } catch (err) {
        console.error('Erreur De la BDD', err);
        const error = "Une erreur est survenue" ;
        return res.render('home/Error', {error,pseudoUtilisateur});
    }
});

module.exports = router;