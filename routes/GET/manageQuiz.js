const express = require('express');
const router = express.Router();
const {Categorie, Question, Quiz} =require('../../config/dbconnect')

router.get('/manageQuiz/:id',async function(req,res) {
    
    const idQuiz = req.params.id;
    
    if (!req.session.utilisateur) {
        return res.status(401).json({ message: 'Vous n\'êtes pas authentifié' });
    }
    const isAdmin = req.session.utilisateur.admin;

    // Vérifier si l'utilisateur est un administrateur
    if (!isAdmin) {
        return res.status(403).json({ message: 'Vous n\'avez pas les autorisations nécessaires pour modifier un quiz' });
    }
    try{
        const quiz = await Quiz.findByPk(idQuiz);
        const question = await Question.findAll({where:{id_quiz:idQuiz}});

        let divInfo ='<div class="quiz-create">';
        if(question.length > 0){
            divInfo += `<h3>Les questions du quiz <span>${quiz.titre}</span>:</h3> `;
            question.forEach((question)=>{
                divInfo += `<form method="post" action="/deleteQuest/${question.id_question}"><p>${question.Intitule} <button type="submit">Supprimer</button><a href="/manageQuest/${question.id_question}">Modifier</a></p></form>`;
            })
        }
        divInfo +='</div>';
        if(!quiz){
            return res.status(404).json({message: 'le quiz n\'existe pas !'})
        }
        htmlQuiz =  `<form class="quiz-create" method="post" action="/manageQuiz/${idQuiz}"><h1>modification du Quiz ${quiz.titre}</h1><table>
        <tr>
            <td>Nom catégorie :</td> <td><input name="designation" class="champ-form" type="text" placeholder="${quiz.titre}"</td>
        </tr>
        <tr>
            <td>Description :</td> <td><textarea name="description" class="champ-form" cols="30" rows="10">${quiz.description}</textarea></td>
        </tr>
        <tr>
            <td><input type="submit" value="Modifier" class="Boutton-form"></td> <td><input type="reset" value="Annuler" class="Boutton-form"></td>
        </tr>
    </table></form>`;
    res.render('login/manageQuiz', {divInfo, htmlQuiz});
    } catch (error) {
        console.error('Erreur lors de la recherche du quiz :', error);
        res.status(500).send('Erreur lors de la recherche du quiz');
      }
})

module.exports = router;