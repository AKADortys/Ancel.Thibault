const express = require('express');
const router = express.Router();
const { Categorie, Question, Quiz } = require('../../config/dbconnect')
const CheckAuth = require('../../config/controller/CheckAuth');

router.get('/manageCateg/:id', CheckAuth, async function (req, res) {

  const pseudoUtilisateur = req.session.utilisateur.pseudo;
  const idCateg = req.params.id;
  if (!idCateg) {
    const error = "URL incomplète ou incorrecte";
    return res.render('home/Error', { error, pseudoUtilisateur })
  }
  //recupérer le pseudo utilisateur pour la nav bar
  const isAdmin = req.session.utilisateur.admin;

  if (!isAdmin) {
    const error = "Vous n'avez pas les autorisations nécessaires pour modifier un quiz";
    return res.render('home/Error', { error, pseudoUtilisateur })
  }

  try {

    const quizCateg = await Quiz.findAll({ where: { id_categ: idCateg } });
    const categorie = await Categorie.findByPk(idCateg);

    let divInfo = '<div class="quiz-create">';
    divInfo += `<h3>les quiz de la catégorie <span>${categorie.designation}</span>:</h3>
                <table>
                  <th>Titre du quiz</th> <th>Outils modification</th>
                  `;
    if (quizCateg.length > 0) {
      quizCateg.forEach((quiz) => {
        divInfo += `<tr>
                      <td>${quiz.titre}</td><td><a href="/manageQuiz/${quiz.id_quiz}">Modifier</a></td>
                    </tr>`;
      });
    }
    divInfo += `</table></div><form class="form-delete" method="post" action="/deleteCategory/${idCateg}"><button onclick="return confirm('Êtes-vous sûr de vouloir continuer ?')" class="delete" type="submit">Supprimer la catégorie</button></form>`;

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
    res.render('login/manageCateg', { htmlCateg, divInfo, pseudoUtilisateur });

  } catch (err) {
    console.error('Erreur lors de la recherche de la catégorie :', err);
    const error = "Erreur de la recherche de catégorie";
    return res.render('home/Error', { error, pseudoUtilisateur })
  }
})

module.exports = router;
