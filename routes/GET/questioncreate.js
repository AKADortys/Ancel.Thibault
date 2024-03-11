const express = require('express');
const { Quiz } = require('../../config/dbconnect');
const router = express.Router();

router.get('/questcreate', async function (req, res) {

    if (!req.session.utilisateur) {
        return res.redirect('/userLogin');
    }
    const isAdmin = req.session.utilisateur.admin;
    
    // Vérifier si l'utilisateur est un administrateur
    if (!isAdmin) {
        return res.status(403).json({ message: 'Vous n\'avez pas les autorisations nécessaires pour modifier un quiz' });
    }
    try {
        if (!req.session.utilisateur) { return res.redirect('/userLogin'); }
        const quiz = await Quiz.findAll();
        let selectQuiz = '<label for="quiz">Quiz :</label><select name="quiz" id="quiz">';
        quiz.forEach((quiz) => {
            selectQuiz += `<option value="${quiz.id_quiz}">${quiz.titre}</option>`;
        });
        selectQuiz += '</select>';
        res.render('login/usercreatequest', { selectQuiz });
    } catch (error) {
        console.error('Erreur De la BDD', error);
        res.status(500).send('Erreur de la BDD');
    }
});

module.exports = router;