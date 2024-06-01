const express = require('express');
const router = express.Router();
const { Categorie } = require('../../config/dbconnect');
const CheckAuth = require('../../config/controller/CheckAuth');

router.post('/CategCreate', CheckAuth, async (req, res) => {
  const pseudoUtilisateur =req.session.utilisateur.pseudo;
  try {
    const { designation, description } = req.body;
    const idUser = req.session.utilisateur.id_user;
    const isAdmin = req.session.utilisateur.admin;

    // Vérifier si l'utilisateur est un administrateur
    if (!isAdmin) {
      const error = 'Vous n\'avez pas les autorisations nécessaires pour créer une catégorie' ;
      return res.render('home/Error', {error,pseudoUtilisateur})
    }

    if (!designation || !description) {
      const error = 'Veuillez fournir un titre et une description pour la catégorie';
      return res.render('home/Error', {error,pseudoUtilisateur});
    }

    const newCategorie = await Categorie.create({
    designation,
      description,
      id_user: idUser
    });

    console.log('Nouvelle catégorie créée avec succès !');
    res.redirect('/profil');

  } catch (err) {
    console.error('Erreur lors de l\'insertion de la catégorie :', err);
    const error = 'Erreur lors de l\'insertion de la catégorie';
    return res.render('home/Error', {error,pseudoUtilisateur});
  }
});

module.exports = router;
