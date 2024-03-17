const express = require('express');
const router = express.Router();
const { Utilisateur, Categorie, Quiz, Question } = require('../../config/dbconnect');

router.get('/profil', async function (req, res) {
  try {
    // Vérifier si la session de l'utilisateur existe
    if (!req.session.utilisateur) {
      // Si la session n'est pas détectée, rediriger vers la page de connexion
      return res.redirect('/userLogin');
    }

    // Récupérer l'id de l'utilisateur à partir de la session
    const idUtilisateur = req.session.utilisateur.id_user;
    const isAdmin = req.session.utilisateur.admin;

    // Rechercher l'utilisateur dans la base de données par l'id
    const utilisateur = await Utilisateur.findByPk(idUtilisateur);
    if (!utilisateur) {
      // Si l'utilisateur n'est pas trouvé, gérer le cas approprié
      return res.status(404).send('Utilisateur non trouvé');
    }

    const status = utilisateur.admin ? 'Admin' : 'Joueur';

    let categoriesListe = '';
    let allUsers = '';
    let quizListe = '';
    let nbrsLignes = '';
    
    if(isAdmin)
    {
      //compter le nombre de questions associése à l'utilisateur
      const questionUtilisateur = await Question.count({
      where: { id_user: idUtilisateur },
    });

    // Rechercher les catégories associées à l'utilisateur
    const categoriesUtilisateur = await Categorie.findAll({
      where: { id_user: idUtilisateur },
    });
    const quizUtilisateur = await Quiz.findAll({
      where: { id_user: idUtilisateur },
    });

    //rechercher tout les utilisateurs
    const allUtilisateur = await Utilisateur.findAll();

    if (allUtilisateur.length > 0) {

      allUsers += `<table class='top10Modal-table'>
                      <th>ID</th>
                      <th>pseudo</th>
                      <th>Admin</th>
                      <th>mail</th>
                      <th>nom</th>
                      <th>prenom</th>
                      <th>Date d'inscription</th>
                      <th>Modification</th>`;
  
      allUtilisateur.forEach((user) => {
          // Convertir la date en objet Date
          const dateInscription = new Date(user.date_inscri);
  
          // Formater la date au format européen (dd/mm/yyyy)
          const formattedDate = `${dateInscription.getDate().toString().padStart(2, '0')}/${(dateInscription.getMonth() + 1).toString().padStart(2, '0')}/${dateInscription.getFullYear()}`;
  
          allUsers +=
                    `<tr>
                      <td>${user.id_user}</td>
                      <td>${user.pseudo}</td>
                      <td>${user.admin}</td>
                      <td>${user.mail}</td>
                      <td>${user.nom}</td>
                      <td>${user.prenom}</td>
                      <td>${formattedDate}</td>
                      <td><a href="/manageUser/${user.id_user}">Modifier</a></td>
                    </tr>`;
      })
      allUsers += `</table>`
  }
  

    nbrsLignes += `<p>Nombres de question créer: ${questionUtilisateur}</p>`;

    if (quizUtilisateur.length > 0) {
      quizListe = '<h3>Vos quizs :</h3>';
      quizUtilisateur.forEach((quiz) => {
        quizListe += `<p>${quiz.titre}<a href="/manageQuiz/${quiz.id_quiz}">Modifier</a></p>`;
      });
    }

    if (categoriesUtilisateur.length > 0) {
      categoriesListe = '<h3>Vos catégories :</h3>';
      categoriesUtilisateur.forEach((categorie) => {
        categoriesListe += `<p>${categorie.designation}<a href="/manageCateg/${categorie.id_categ}">Modifier</a>`;
      });
    }};
    let tableUser = `<table class='top10Modal-table'>
                  <tr>
                      <td>Votre pseudo :</td>
                      <td>${utilisateur.pseudo}</td>
                  </tr>
                  <tr> 
                      <td>Votre nom :</td>
                      <td>${utilisateur.nom}</td>
                  </tr>
                  <tr>
                      <td>Votre prénom :</td>
                      <td>${utilisateur.prenom}</td>
                  </tr>
                  <tr>
                      <td>Date d'inscription :</td>
                      <td>${utilisateur.date_inscri}</td>
                  </tr>
                  <tr>
                      <td>Votre Email :</td>
                      <td>${utilisateur.mail}</td>
                  </tr>
                  <tr>
                      <td>Votre status :</td>
                      <td>${status}</td>
                  </tr>
                  <tr>
                    <td>Modification :</td>
                    <td><a href="/manageUser/${utilisateur.id_user}">Modifier</a></td>
                  </tr>
                </table>`;

    res.render('home/profil', { tableUser, categoriesListe, quizListe, nbrsLignes, allUsers });
  } catch (error) {
    console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
    res.status(500).send('Erreur lors de la récupération des informations de l\'utilisateur');
  }
});



module.exports = router;