const express = require('express');
const router = express.Router();
const { Categorie } = require('../../config/dbconnect');
const CheckAuth = require('../../config/script/CheckAuth');

router.get('/quizcreate', CheckAuth,async function (req, res) {
  try {
  const isAdmin = req.session.utilisateur.admin;
  
  // Vérifier si l'utilisateur est un administrateur
  if (!isAdmin) { 
      return res.status(403).json({ message: 'Vous n\'avez pas les autorisations nécessaires pour modifier un quiz' });
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
        const pseudoUtilisateur = req.session.utilisateur.pseudo;

    res.render('login/usercreatequiz', { selectcateg , pseudoUtilisateur});
  } catch (error) {
    console.error('Erreur lors de l\'accès à la création de quiz :', error);
    res.status(500).send('Erreur lors de l\'accès à la création de quiz');
  }
});

module.exports = router;
