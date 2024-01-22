const express = require('express');
const router = express.Router();
const { Utilisateur,Categorie, Quiz } = require('../../config/dbconnect');
const { where } = require('sequelize');

router.get('/profil', async function (req, res) {
  try {
    // Vérifier si la session de l'utilisateur existe
    if (!req.session.utilisateur) {
      // Si la session n'est pas détectée, rediriger vers la page de connexion
      return res.redirect('/userLogin');
    }

    // Récupérer l'id de l'utilisateur à partir de la session
    const idUtilisateur = req.session.utilisateur.id_user;

    // Rechercher l'utilisateur dans la base de données par l'id
    const utilisateur = await Utilisateur.findByPk(idUtilisateur);
    if (!utilisateur) {
      // Si l'utilisateur n'est pas trouvé, gérer le cas approprié
      return res.status(404).send('Utilisateur non trouvé');
    }
    let status = utilisateur.admin;
    if (status) {
      status = 'Admin';
    }
    else if (!status) {
      status = 'Joueur';
    }

    // Rechercher les catégories associées à l'utilisateur
    const categoriesUtilisateur = await Categorie.findAll({
      where: { id_user: idUtilisateur },
    });
    const quizUtilisateur = await Quiz.findAll({
      where: {id_user: idUtilisateur},
    });

    let quizListe = '';
    if(quizUtilisateur.length > 0) {
      quizListe = '<p>Vos quizs :</p><ul>';
      quizUtilisateur.forEach((quiz) =>{
        quizListe += `<li>${quiz.titre}</li>`;
      });
      quizListe += '</ul>';
    }

    let categoriesListe = '';
    if (categoriesUtilisateur.length > 0) {
      categoriesListe = '<p>Vos catégories :</p><ul>';
      categoriesUtilisateur.forEach((categorie) => {
        categoriesListe += `<li>${categorie.designation}</li>`;
      });
      categoriesListe += '</ul>';
    };
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
                </table>`;

    res.render('home/profil', { tableUser, categoriesListe, quizListe });
  } catch (error) {
    console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
    res.status(500).send('Erreur lors de la récupération des informations de l\'utilisateur');
  }
});



module.exports = router;