const express = require('express');
const router = express.Router();
const { Question, Reponse, Quiz } = require('../../config/dbconnect');
const CheckAuth = require('../../public/script/CheckAuth');

router.get('/manageQuest/:id', CheckAuth, async function (req, res) {

    const idQuestion = req.params.id;
    const isAdmin = req.session.utilisateur.admin;

    // Vérifier si l'utilisateur est un administrateur
    if (!isAdmin) {
        return res.status(403).json({ message: 'Vous n\'avez pas les autorisations nécessaires pour supprimer un quiz' });
    }

    try {
            //recupérer le pseudo utilisateur pour la nav bar
    const pseudoUtilisateur = req.session.utilisateur.pseudo;
        const question = await Question.findByPk(idQuestion);
        const reponseIncorrect = await Reponse.findAll({ where: { id_question: idQuestion, correct: false } });
        const reponseCorrect = await Reponse.findAll({ where: { id_question: idQuestion, correct: true } });
        const quiz = await Quiz.findAll();
        console.log(reponseCorrect);
        let selectQuiz = `<label for="quiz">Quiz:</label><select name="quiz" id="quiz">`;
        quiz.forEach((quiz) => {
            if (quiz.id_quiz === question.id_quiz) {

                selectQuiz += `<option value="${quiz.id_quiz}" selected>${quiz.titre}</option>`;
            }
            else {

                selectQuiz += `<option value="${quiz.id_quiz}">${quiz.titre}</option>`;
            }
        });
        selectQuiz += '</select>';

        let htmlQuestion =
        `<form method="post" class="quiz-create" action="/manageQuest/${idQuestion}">
        <h1>Modification la question</h1>
        <table>
        <tr>
        <td colspan="2">Intitulé de la question :</td>
        </tr>
        <tr>
        <td colspan="2">
        <textarea id="questInti" name="questInti" cols="30" rows="10" maxlenght="200" class="champ-form">
        ${question.Intitule}
        </textarea>
        </td>
        </tr>
        <tr>
        <td>
        <label for="questDiff">Difficulté :</label>
        <select name="questDiff" id="questDiff">
        <option value="1" ${question.difficulte === 1 ? 'selected' : ''}>Facile</option>
        <option value="2" ${question.difficulte === 2 ? 'selected' : ''}>Moyen</option>
        <option value="3" ${question.difficulte === 3 ? 'selected' : ''}>Difficile</option>
        </select>
        </td>
        <td>${selectQuiz}</td>
        </tr>
        <tr>
        <td colspan="2">
        <input type="text" minlength="1" maxlength="100" id="questRep" name="questRep" class="champ-form" value="${reponseCorrect[0].dataValues.reponse}">
        </td>
        </tr>`;
        let indx = 0;
        reponseIncorrect.forEach((rep) => {
            indx++;
            htmlQuestion +=
            `<tr>
            <td colspan="2">
            <input type="text" minlength="1" maxlength="100" id="questRep${indx}" name="questRep${indx}" class="champ-form" value="${rep.reponse}">
            </td>
            </tr>`;
        });
        
        htmlQuestion +=
        `<tr>
        <td align="center"><input type="submit" value="Validé !" class="Boutton-form"></td>
        <td><input type="reset" value="Annuler" class="Boutton-form"></td>
        </tr></table></form>`;
        htmlQuestion +=`<form method="post" action="/deleteQuest/${idQuestion}"><button class="delete" type="submit">Supprimer la question</button></form>`
        
        res.render('login/manageQuest', { htmlQuestion , pseudoUtilisateur})
    }
    
    
    catch (error) {
        console.error('Erreur lors de la récupération des informations de la question :', error);
        res.status(500).send('Erreur lors de la récupération des informations de la question');
    }
});

module.exports = router;