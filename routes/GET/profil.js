const express = require('express');
const router = express.Router();
const { Utilisateur, Categorie, Quiz, Question, Reponse, Score } = require('../../config/dbconnect');

router.get('/profil', async function (req, res) {
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
    let allCateg = '';
    if (categories.length > 0 && isAdmin) {
      //initialisation du titre et du conteneur
      allCateg +=
        `
           <h2>Les catégories et leurs quizs</h2>
           <div class="allCategQuiz">
           `;
      //utilisation d'une boucle for ici est particulière, à la base j'utilisais forEach() mais il s'est avérer que cette méthode ne prend pas parfaitement en compte les fonction async
      for (const categ of categories) {
        const quizs = await Quiz.findAll({ where: { id_categ: categ.id_categ } });

        allCateg +=
          `
           <div class="section-group">
           <h3>Catégorie :${categ.designation}</h3>
           <p>${categ.description}</p>
           <p><a href="/manageCateg/${categ.id_categ}">Modifier la catégorie</a></p>
           `;
        for (const quiz of quizs) {

          const nbrsQuest = await Question.count({ where: { id_quiz: quiz.id_quiz } });
          const adjustImage = quiz.image.substring(7);
          allCateg +=
            `
             <section>
               <h4>Quiz :${quiz.titre}</h4>
               <p>${quiz.description}</p>
               <img src="${adjustImage}">
               <p>Nombres de question attribuées à ce quiz : ${nbrsQuest}</p>
               <a href="/manageQuiz/${quiz.id_quiz}">Modifier le quiz</a>
             </section>
             `;
        }
        allCateg += '</div>'
      }
      allCateg += '</div>';
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
    console.log(scoreUserTable)
    res.render('home/profil', {
      utilisateur,
      status,
      scoreUserTable,
      formattedDate,
      pseudoUtilisateur,
      categoriesUtilisateur,
      quizUtilisateur,
      allUtilisateur,
      allCateg,
      isAdmin
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
    res.status(500).send('Erreur lors de la récupération des informations de l\'utilisateur');
  }
});

module.exports = router;
