const express = require('express');
const router = express.Router();
const { Utilisateur, Categorie } = require('../../config/dbconnect');

router.get('/quizcreate', async function (req, res) {
  try {
    // Vérifier si la session de l'utilisateur existe
    if (!req.session.utilisateur) {
      // Si la session n'est pas détectée, rediriger vers la page de connexion
      return res.redirect('/userLogin');
    }
    // Récupérer toutes les catégories disponibles depuis la base de données
    const categories = await Categorie.findAll();

    // Générer une liste déroulante des catégories
    let selectcateg = `<label for="categorie">Catégorie :</label><select name="categorie" id="categorie">`;
    categories.forEach((categorie) => {
      selectcateg += `<option value="${parseInt(categorie.id_categ)}">${categorie.designation}</option>`;
    });
    selectcateg += `</select>`;

    res.render('login/usercreatequiz', { selectcateg });
  } catch (error) {
    console.error('Erreur lors de l\'accès à la création de quiz :', error);
    res.status(500).send('Erreur lors de l\'accès à la création de quiz');
  }
});

module.exports = router;
