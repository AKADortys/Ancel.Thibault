const express = require('express');
const router = express.Router();
const {Categorie, Question, Quiz} =require('../../config/dbconnect')
const CheckAuth = require('../../public/script/CheckAuth');

router.get('/manageCateg/:id', CheckAuth,async function(req,res) {
    
    const idCateg = req.params.id;
    //recupérer le pseudo utilisateur pour la nav bar
    const pseudoUtilisateur = req.session.utilisateur.pseudo;
    const isAdmin = req.session.utilisateur.admin;

    // Vérifier si l'utilisateur est un administrateur
    if (!isAdmin) {
        return res.status(403).json({ message: 'Vous n\'avez pas les autorisations nécessaires pour supprimer un quiz' });
    }

    try{
        
    const quizCateg = await Quiz.findAll({where:{id_categ: idCateg}});
    const categorie = await Categorie.findByPk(idCateg);

    let divInfo ='<div class="quiz-create">';
    divInfo += `<h3>les quiz de la catégorie <span>${categorie.designation}</span>:</h3>`;
    if(quizCateg.length > 0) {
      quizCateg.forEach((quiz) =>{
        divInfo += `<p>${quiz.titre}<a href="/manageQuiz/${quiz.id_quiz}">Modifier</a></p></form>`;
      });
    }
    divInfo += `</div><form method="post" action="/deleteCategory/${idCateg}"><button class="delete" type="submit">Supprimer la catégorie</button></form>`;

    if (!categorie) {
      return res.status(404).json({ message: 'La catégorie n\'existe pas' });
    }
    htmlCateg = `<form class="quiz-create" method="post" action="/manageCateg/${idCateg}"><h1>modification de la catégorie ${categorie.designation}</h1><table>
                    <tr>
                        <td>Nom catégorie :</td> <td><input name="designation" class="champ-form" type="text" placeholder="${categorie.designation}" value="${categorie.designation}"</td>
                    </tr>
                    <tr>
                        <td>Description :</td> <td><textarea name="description" class="champ-form" cols="30" rows="10">${categorie.description}</textarea></td>
                    </tr>
                    <tr>
                        <td><input type="submit" value="Modifier" class="Boutton-form"></td> <td><input type="reset" value="Annuler" class="Boutton-form"></td>
                    </tr>
                </table></form>`;
    res.render('login/manageCateg',{htmlCateg, divInfo, pseudoUtilisateur});

    } catch (error) {
        console.error('Erreur lors de la recherche de la catégorie :', error);
        res.status(500).send('Erreur lors de la recherche de la catégorie');
      }
})

module.exports = router;