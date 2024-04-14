const express = require('express');
const { Quiz } = require('../../config/dbconnect');
const router = express.Router();
const CheckAuth = require('../../config/script/CheckAuth');

router.get('/questcreate', CheckAuth,async function (req, res) {
    const isAdmin = req.session.utilisateur.admin;
    
    // Vérifier si l'utilisateur est un administrateur
    if (!isAdmin) {
        return res.status(403).json({ message: 'Vous n\'avez pas les autorisations nécessaires pour modifier un quiz' });
    }
    try {
        if (!req.session.utilisateur) { return res.redirect('/userLogin'); }
        const quiz = await Quiz.findAll();
        let selectQuiz = '<label for="quiz">Quiz :</label><select name="id_quiz" id="quiz">';
        quiz.forEach((quiz) => {
            selectQuiz += `<option value="${quiz.id_quiz}">${quiz.titre}</option>`;
        });
        selectQuiz += '</select>';
            //recupérer le pseudo utilisateur pour la nav bar
    const pseudoUtilisateur = req.session.utilisateur.pseudo;
        res.render('login/usercreatequest', { selectQuiz, pseudoUtilisateur });
    } catch (error) {
        console.error('Erreur De la BDD', error);
        res.status(500).send('Erreur de la BDD');
    }
});

module.exports = router;