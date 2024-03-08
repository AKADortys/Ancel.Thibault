const express = require('express');
const router = express.Router();
const {Question, Reponse, Quiz} = require('../../config/dbconnect');

router.get('/manageQuest/:id',async function (req,res) {

    const idQuestion = req.params.id;

    if (!req.session.utilisateur) {
        return res.status(401).json({ message: 'Vous n\'êtes pas authentifié' });
    }
    const isAdmin = req.session.utilisateur.admin;

    // Vérifier si l'utilisateur est un administrateur
    if (!isAdmin) {
        return res.status(403).json({ message: 'Vous n\'avez pas les autorisations nécessaires pour supprimer un quiz' });
    }

    try{
        const question = await Question.findByPk(idQuestion);
        const reponse = await Reponse.findAll({where:{id_question: idQuestion}});
        const quiz = await Quiz.findAll();

        let selectQuiz = `<label for="quiz">Quiz:</label><select name="quiz" id="quiz">`;
        quiz.forEach((quiz) => {
            selectQuiz += `<option value="${quiz.id_quiz}">${quiz.titre}</option>`;
        });
        selectQuiz += '</select>';

        let htmlQuestion = `<form enctype="multipart/form-data" method="post" class="quiz-create" action="/manageQuestion/${idQuestion}">
                                <h1>Modification la question "${question.intitule}"</h1>
                                <table>
                                    <tr>
                                        <td colspan="2">Intitulé de la question :</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            <textarea id="questInti" cols="30" rows="10" maxlenght="200" class="champ-form">
                                                ${question.intitule}
                                            </textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label for="questDiff">Difficulté :</label>
                                            <select name="difficult" id="questDiff">
                                                <option value="1">Facile</option>
                                                <option value="2">Moyen</option>
                                                <option value="3">Difficile</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>${selectQuiz}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            <input type="text" minlength="1" maxlength="100" id="questRep1" class="champ-form" value="${}">
                                        </td>
                                    </tr>
                                </table>`
    }


    catch{

    }
});