const express = require('express');
const router = express.Router();
const { Utilisateur, Categorie, Quiz } = require('../../config/dbconnect');

router.get('/home', async function (req, res) {
  try {
    // Vérifier si la session de l'utilisateur existe
    if (!req.session.utilisateur) {
      // Si la session n'est pas détectée, rediriger vers la page de connexion
      return res.redirect('/userLogin');
    }

    // Récupérer toutes les catégories
    const categories = await Categorie.findAll();

    // Récupérer tous les quizzes
    const quizzes = await Quiz.findAll();

    // Regrouper les quizzes par id_categ
    const quizzesByCategory = {};
    quizzes.forEach((quiz) => {
      const idCateg = quiz.id_categ;
      if (!quizzesByCategory[idCateg]) {
        quizzesByCategory[idCateg] = [];
      }
      // Remove 'public/' prefix from image path
      quiz.adjustedImage = quiz.image.substring(7); // Assuming 'public/' is 7 characters
      quizzesByCategory[idCateg].push(quiz);
    });
    
    // Génération du HTML pour les catégories et les quizzes
    let categoriesHtml = '';
    for (const category of categories) {
      const categoryId = category.id_categ;
      const quizzesForCategory = quizzesByCategory[categoryId] || [];
    
      categoriesHtml += `<div class="containeur">
                            <h1>${category.designation}</h1>
                            <p>${category.description}</p>
                            <div class="leftbar">`;
    
      quizzesForCategory.forEach((quiz) => {
        categoriesHtml += `<div class='bloc'>
                              <img src="${quiz.adjustedImage}" alt="Image du quiz">
                              <section>
                                <h3>${quiz.titre}</h3>
                                <p>${quiz.description}</p>
                              </section>
                            </div>`;
      });
    
      categoriesHtml += `</div></div>`;
    }

    // Génération du HTML pour la liste des utilisateurs
    let tableHtml = '<table class=\'top10Modal-table\' >';
    tableHtml += '<tr><th>Pseudo</th><th>Nom</th><th>Prénom</th></tr>';

    const utilisateurs = await Utilisateur.findAll();
    utilisateurs.forEach((utilisateur) => {
      tableHtml += `<tr>
                        <td>${utilisateur.pseudo}</td>
                        <td>${utilisateur.nom}</td>
                        <td>${utilisateur.prenom}</td>
                    </tr>`;
    });
    tableHtml += '</table>';

    // Rendu de la vue EJS avec les données
    res.render('home/index', { tableHtml, categoriesHtml });
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    res.status(500).send('Erreur lors de la récupération des données');
  }
});

module.exports = router;
