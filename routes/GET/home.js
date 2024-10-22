const express = require('express');
const router = express.Router();
const { Utilisateur, Categorie, Quiz } = require('../../config/dbconnect');
const CheckAuth = require('../../config/controller/CheckAuth');
const { Op } = require('sequelize');

router.get('/home', CheckAuth, async function (req, res) {
  const pseudoUtilisateur = req.session.utilisateur.pseudo;
  try {

    //recupérer le pseudo utilisateur pour la nav bar

    //créer une liste des catégories et de leurs quizs asignés 
    let categorieQuizTable = [];
    const categories = await Categorie.findAll();

    for (const categ of categories) {
      let object =
      {
        id_categ: categ.id_categ,
        designation: categ.designation,
        description: categ.description,
        date: categ.date_ajout,
        quiz: []
      };
      const quiz = await Quiz.findAll({ where: { id_categ: categ.id_categ } })

      quiz.forEach((i) => {
        let objQuiz =
        {
          id_quiz: i.id_quiz,
          titre: i.titre,
          description: i.description,
          date: i.date_ajout,
          image: i.image.substring(7)
        }
        object.quiz.push(objQuiz);
      })

      categorieQuizTable.push(object);
    }

    const utilisateurs = await Utilisateur.findAll();
    const titre = req.query.titre;
    // Recherche des quiz par titre
    let quizzes = [];
    if (titre) {
      quizzes = await Quiz.findAll({
        where: {
          titre: {
            [Op.like]: `%${titre}%`
          }
        }
      });
    }

    // Rendu de la vue EJS avec les données
    res.render('home/index', { categorieQuizTable, pseudoUtilisateur, utilisateurs, quizzes });
  } catch (erreur) {
    const error = "Erreur lors de la récupération des données !"
    console.error('Erreur lors de la récupération des données :', erreur);
    return res.render('home/Error', { error, pseudoUtilisateur })
  }
});

module.exports = router;
