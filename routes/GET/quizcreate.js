const express = require('express');
const router = express.Router();
const { Categorie } = require('../../config/dbconnect');
const CheckAuth = require('../../config/controller/CheckAuth');

router.get('/quizcreate', CheckAuth,async function (req, res) {
  try {
    const isAdmin = req.session.utilisateur.admin;
    const pseudoUtilisateur = req.session.utilisateur.pseudo;
  
  // Vérifier si l'utilisateur est un administrateur
  if (!isAdmin) { 
    const error = "Vous n'avez pas les autorisations pour créer un quiz" ;
    return res.render('home/Error', {error,pseudoUtilisateur})
  }
    // Récupérer toutes les catégories disponibles depuis la base de données
    const categories = await Categorie.findAll();

    // Générer une liste déroulante des catégories
    let selectcateg = `<label for="categorie">Catégorie :</label><select name="id_categ" id="categorie">`;
    categories.forEach((categorie) => {
      selectcateg += `<option value="${parseInt(categorie.id_categ)}">${categorie.designation}</option>`;
    });
    selectcateg += `</select>`;

        //recupérer le pseudo utilisateur pour la nav bar

    res.render('login/usercreatequiz', { selectcateg , pseudoUtilisateur});
  } catch (err) {
    console.error('Erreur lors de l\'accès à la création de quiz :', err);
    const error = "Erreur lors de l'accès à la création de qui" ;
    return res.render('home/Error', {error,pseudoUtilisateur});
  }
});

module.exports = router;
