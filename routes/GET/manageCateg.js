const express = require('express');
const router = express.Router();
const {Categorie, Question, Quiz} =require('../../config/dbconnect')

router.get('/manageCateg/:id',async function(req,res) {
    
    const idCateg = req.params.id;
    
    if (!req.session.utilisateur) {
        return res.status(401).json({ message: 'Vous n\'êtes pas authentifié' });
    }
    const isAdmin = req.session.utilisateur.admin;

    // Vérifier si l'utilisateur est un administrateur
    if (!isAdmin) {
        return res.status(403).json({ message: 'Vous n\'avez pas les autorisations nécessaires pour supprimer un quiz' });
    }

    try{
        
    const quizCateg = await Quiz.findAll({where:{id_categ: idCateg}});
    const categorie = await Categorie.findByPk(idCateg);

    let divInfo ='<div class="quiz-create">';
    if(quizCateg.length > 0) {
      divInfo += `<h3>les quiz de la catégorie <span>${categorie.designation}</span>:</h3>`;
      quizCateg.forEach((quiz) =>{
        divInfo += `<form method="post" action="/deleteQuiz/${quiz.id_quiz}"><p>${quiz.titre} <button type="submit">Supprimer</button><a href="/manageQuiz/${quiz.id_quiz}">Modifier</a></p></form>`;
      });
      divInfo += '</div>';
    }

    if (!categorie) {
      return res.status(404).json({ message: 'La catégorie n\'existe pas' });
    }
    htmlCateg = `<form class="quiz-create" method="post" action="/manageCateg/${idCateg}"><h1>modification de la catégorie ${categorie.designation}</h1><table>
                    <tr>
                        <td>Nom catégorie :</td> <td><input name="designation" class="champ-form" type="text" placeholder="${categorie.designation}"</td>
                    </tr>
                    <tr>
                        <td>Description :</td> <td><textarea name="description" class="champ-form" cols="30" rows="10">${categorie.description}</textarea></td>
                    </tr>
                    <tr>
                        <td><input type="submit" value="Modifier" class="Boutton-form"></td> <td><input type="reset" value="Annuler" class="Boutton-form"></td>
                    </tr>
                </table></form>`;
    res.render('login/manageCateg',{htmlCateg, divInfo});

    } catch (error) {
        console.error('Erreur lors de la recherche de la catégorie :', error);
        res.status(500).send('Erreur lors de la recherche de la catégorie');
      }
})

module.exports = router;