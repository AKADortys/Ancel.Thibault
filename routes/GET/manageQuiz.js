const express = require('express');
const router = express.Router();
const { Categorie, Question, Quiz, Reponse } = require('../../config/dbconnect')
const CheckAuth = require('../../config/controller/CheckAuth');

router.get('/manageQuiz/:id', CheckAuth, async function (req, res) {
    try {
        const pseudoUtilisateur = req.session.utilisateur.pseudo;
        const idQuiz = req.params.id;
        const isAdmin = req.session.utilisateur.admin;
        if(!idQuiz){
            const error = "URL incomplète ou incorrecte !" ;
            return res.render('home/Error', {error,pseudoUtilisateur})
        }
        // Vérifier si l'utilisateur est un administrateur
        if (!isAdmin) {
            const error = "Vous n'avez pas les autorisations nécessaires pour modifier un quiz" ;
            return res.render('home/Error', {error,pseudoUtilisateur});
        }
            //recupérer le pseudo utilisateur pour la nav bar
        const quiz = await Quiz.findByPk(idQuiz);
        const questions = await Question.findAll({ where: { id_quiz: idQuiz } });
        const categories =await Categorie.findAll();
        let selectcateg = `<label for="categorie">Catégorie :</label><select name="categorie" id="categorie">`;
        categories.forEach((categorie) => {
          selectcateg += `<option value="${parseInt(categorie.id_categ)}">${categorie.designation}</option>`;
        });
        
        let divInfo = '<div class="quiz-create">';

        if (questions.length > 0) {
            divInfo += `<h3>Les questions du quiz <span>${quiz.titre}</span>:</h3>
                        <table>
                            <th>Intitulé</th> <th>Outil modification</th>`;

            for (const question of questions) {
                const reponses = await Reponse.findAll({ where: { id_question: question.id_question } });

                divInfo += `<tr>
                                <td>${question.Intitule}</td><td><a href="/manageQuest/${question.id_question}">Modifier</a></td>
                            </tr>`;
            }
        }
        divInfo += `</table></div><form class="form-delete" method="post" action="/deleteQuiz/${quiz.id_quiz}"><button onclick="return confirm('Êtes-vous sûr de vouloir continuer ?')" class="delete" type="submit">Supprimer le quiz</button></form>`;

        if (!quiz) {
            return res.status(404).json({ message: 'Le quiz n\'existe pas !' })
        }
        selectcateg += `</select>`;
        const htmlQuiz = `<form enctype="multipart/form-data" class="quiz-create" method="post" action="/manageQuiz/${idQuiz}">
                            <h1>Modification du Quiz ${quiz.titre}</h1>
                            <table>
                                <tr>
                                    <td>Nom catégorie :</td> <td><input name="titre" class="champ-form" type="text" value="${quiz.titre}" placeholder="${quiz.titre}"</td>
                                </tr>
                                <tr>
                                    <td>Description :</td> <td><textarea name="description" class="champ-form" cols="30" rows="10">${quiz.description}</textarea></td>
                                </tr>
                                <tr>
                                <td>${selectcateg}</td> <td>Ajouter une image:<input type="file" name="image"></td>
                                </tr>
                                <tr>
                                <td><input type="submit" value="Modifier" class="Boutton-form"></td> <td><input type="reset" value="Annuler" class="Boutton-form"></td>
                                </tr>
                            </table>
                        </form>`;

        res.render('login/manageQuiz', { divInfo, htmlQuiz, pseudoUtilisateur });
    } catch (err) {
        console.error('Erreur lors de la recherche du quiz :', err);
        const error = "Erreur lors de la recherche du quiz" ;
        return res.render('home/Error', {error,pseudoUtilisateur})
    }
})

module.exports = router;
