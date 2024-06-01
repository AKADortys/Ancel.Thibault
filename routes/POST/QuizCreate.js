const express = require('express');
const router = express.Router();
const { Quiz } = require('../../config/dbconnect');
const upload = require('../../config/multerconfig');
const CheckAuth = require('../../config/controller/CheckAuth');


router.post('/QuizCreate', upload.single('image'), CheckAuth, async (req, res) => {
const pseudoUtilisateur = req.session.utilisateur.pseudo;
  try {
    const { titre, description, id_categ } = req.body;
    const idUser = req.session.utilisateur.id_user;
    const isAdmin = req.session.utilisateur.admin;

    // Vérifier si l'utilisateur est un administrateur
    if (!isAdmin) {
      const error = "Vous n'avez pas les autorisation pour créer un quiz" ;
      return res.render('home/Error', {error,pseudoUtilisateur});
    }

    if (!titre || !description ) {
      const error = "Veillez fournir un titre et une description" ;
      return res.render('home/Error', {error,pseudoUtilisateur});
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

    console.log('Nouveau quiz créé avec succès !');
    res.redirect('/profil')

  } catch (err) {
    console.error('Erreur lors de l\'insertion du quiz :', err);
    const error = "Erreur lors de l'insertion du quiz" ;
    return res.render('home/Error', {error,pseudoUtilisateur});
  }
});

module.exports = router;
