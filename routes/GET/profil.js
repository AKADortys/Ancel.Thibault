const express = require('express');
const router = express.Router();
const { Utilisateur, Categorie, Quiz, Question, Reponse, Score } = require('../../config/dbconnect');
const CheckAuth = require('../../config/controller/CheckAuth');
const quiz = require('../../model/quiz');

router.get('/profil', CheckAuth, async function (req, res) {
  try {
    // Récupérer l'id de l'utilisateur à partir de la session
    const idUtilisateur = req.session.utilisateur.id_user;
    const isAdmin = req.session.utilisateur.admin;
    // Recupérer le pseudo utilisateur pour la navbar
    const pseudoUtilisateur = req.session.utilisateur.pseudo;

    // Rechercher l'utilisateur dans la base de données par l'id
    const utilisateur = await Utilisateur.findByPk(idUtilisateur);
    const status = utilisateur.admin ? 'Admin' : 'Joueur';

    function FomateDate(d) {
      const objDate = new Date(d);
      return `${objDate.getDate().toString().padStart(2, '0')}/${(objDate.getMonth() + 1).toString().padStart(2, '0')}/${objDate.getFullYear()}`;
    }
    // Convertir la date en objet Date
    const dateAjout = new Date(utilisateur.date_inscri);

    // Formater la date au format européen (dd/mm/yyyy)
    const formattedDate = `${dateAjout.getDate().toString().padStart(2, '0')}/${(dateAjout.getMonth() + 1).toString().padStart(2, '0')}/${dateAjout.getFullYear()}`;

    // Rechercher les catégories associées à l'utilisateur
    const categoriesUtilisateur = await Categorie.findAll({
      where: { id_user: idUtilisateur },
    });
    const quizUtilisateur = await Quiz.findAll({
      where: { id_user: idUtilisateur },
    });

    // Rechercher tout les utilisateurs pour les administrateurs
    let allUtilisateur;
    if (isAdmin) {
      allUtilisateur = await Utilisateur.findAll();
    }

    //Chercher dans la bdd toutes les categ et générer les éléments html
    const categories = await Categorie.findAll();
    let categQuizTable = [];
    for (const categ of categories) {
      const userCategCreate = await Utilisateur.findByPk(categ.id_user)
      let obj =
      {
        id: categ.id_categ,
        designation: categ.designation,
        description: categ.description,
        createur: userCategCreate.pseudo,
        date: FomateDate(categ.date_ajout),
        quiz: []
      }
      const quizCateg = await Quiz.findAll({ where: { id_categ: categ.id_categ } })
      for (const n of quizCateg) {
        const userQuizCreate = await Utilisateur.findByPk(n.id_user)
        const nbrQuestion = await Question.count({ where: { id_quiz: n.id_quiz } })
        let objquiz =
        {
          id: n.id_quiz,
          titre: n.titre,
          description: n.description,
          date: FomateDate(n.date_ajout),
          image: n.image.substring(7),
          createur: userQuizCreate.pseudo,
          question: nbrQuestion
        }
        obj.quiz.push(objquiz)
      }
      categQuizTable.push(obj)
    }

    const score = await Score.findAll({ where: { id_user: utilisateur.id_user } });
    let scoreUserTable = [];

    for (const sco of score) {
      let scoreUser = {};
      scoreUser.total = sco.total
      scoreUser.date = FomateDate(sco.MaJ);
      const scoreQuiz = await Quiz.findByPk(sco.id_quiz);
      scoreUser.nomQuiz = scoreQuiz.titre;
      scoreUser.id_quiz = scoreQuiz.id_quiz;
      scoreUserTable.push(scoreUser)
    };
    res.render('home/profil', {
      utilisateur,
      status,
      scoreUserTable,
      pseudoUtilisateur,
      categoriesUtilisateur,
      quizUtilisateur,
      allUtilisateur,
      isAdmin,
      categQuizTable,
      formattedDate
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
    res.status(500).send('Erreur lors de la récupération des informations de l\'utilisateur');
  }
});

module.exports = router;
