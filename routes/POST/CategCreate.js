const express = require('express');
const router = express.Router();
const { Categorie } = require('../../config/dbconnect');
const CheckAuth = require('../../public/script/CheckAuth');

router.post('/CategCreate', CheckAuth, async (req, res) => {
  try {
    const { designation, description } = req.body;
    const idUser = req.session.utilisateur.id_user;
    const isAdmin = req.session.utilisateur.admin;

    // Vérifier si l'utilisateur est un administrateur
    if (!isAdmin) {
      return res.status(403).json({ message: 'Vous n\'avez pas les autorisations nécessaires pour créer une catégorie' });
    }

    if (!designation || !description) {
      return res.status(400).json({ message: 'Veuillez fournir un titre et une description pour la catégorie' });
    }

    const newCategorie = await Categorie.create({
    designation,
      description,
      id_user: idUser
    });

    console.log('Nouvelle catégorie créée avec succès !', newCategorie );
    res.redirect('/profil');

  } catch (error) {
    console.error('Erreur lors de l\'insertion de la catégorie :', error);

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: 'Erreur de validation des données de la catégorie' });
    }

    res.status(500).json({ error: 'Erreur lors de l\'insertion de la catégorie' });
  }
});

module.exports = router;
