const express = require('express');
const router = express.Router();
const { Categorie } = require('../../config/dbconnect');

router.post('/CategCreate', async (req, res) => {
  try {
    const { designation, description } = req.body;

    // Vérifier si la session de l'utilisateur existe
    if (!req.session.utilisateur) {
      return res.status(401).json({ message: 'Vous n\'êtes pas authentifié' });
    }

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

    res.status(201).json({ message: 'Nouvelle catégorie créée avec succès !', newCategorie });

  } catch (error) {
    console.error('Erreur lors de l\'insertion de la catégorie :', error);

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: 'Erreur de validation des données de la catégorie' });
    }

    res.status(500).json({ error: 'Erreur lors de l\'insertion de la catégorie' });
  }
});

module.exports = router;
