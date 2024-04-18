const express = require('express');
const router = express.Router();
const { Quiz } = require('../../config/dbconnect');
const upload = require('../../config/multerconfig');
const CheckAuth = require('../../config/controller/CheckAuth');


router.post('/QuizCreate', upload.single('image'), CheckAuth, async (req, res) => {
  try {
    const { titre, description, id_categ } = req.body;
    const idUser = req.session.utilisateur.id_user;
    const isAdmin = req.session.utilisateur.admin;

    // Vérifier si l'utilisateur est un administrateur
    if (!isAdmin) {
      return res.status(403).json({ message: 'Vous n\'avez pas les autorisations nécessaires pour créer un quiz' });
    }

    if (!titre || !description ) {
      return res.status(400).json({ message: 'Veuillez fournir un titre et une description pour le quiz' });
    }

    // Récupérer le chemin de l'image à partir de la requête Multer
    const imagePath = req.file.path;
    const adjustedImagePath = imagePath.substring(imagePath.indexOf('public/'));

    console.log(adjustedImagePath);

    const newQuiz = await Quiz.create({
      titre,
      description,
      id_user: idUser,
      id_categ: id_categ,
      image: adjustedImagePath,
    });

    console.log('Nouveau quiz créé avec succès !', newQuiz );
    res.redirect('/profil')

  } catch (error) {
    console.error('Erreur lors de l\'insertion du quiz :', error);

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: 'Erreur de validation des données du quiz' });
    }

    res.status(500).json({ error: 'Erreur lors de l\'insertion du quiz' });
  }
});

module.exports = router;
