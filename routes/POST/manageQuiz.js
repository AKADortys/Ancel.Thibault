const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const upload = require('../../config/multerconfig');
const {  Quiz } = require('../../config/dbconnect');
const CheckAuth = require('../../config/controller/CheckAuth');


router.post('/manageQuiz/:id', upload.fields([{ name: 'image' }]), CheckAuth, async function (req, res) {
    const pseudoUtilisateur = req.session.utilisateur.pseudo;
    try {
        const idQuiz = req.params.id;
        if(!idQuiz) {
            const error = "paramètres invalides" ;
            return res.render('home/Error', {error,pseudoUtilisateur});
        }
        // Récupération des données du formulaire
        const titre = req.body.titre;
        const description = req.body.description;
        const categorieId = req.body.categorie;
        const isAdmin = req.session.utilisateur.admin;
        if(!titre || !description || !categorieId){
            const error = "veillez remplir tout les champs obligatoire" ;
            return res.render('home/Error', {error,pseudoUtilisateur});
        }
        // Vérifier si l'utilisateur est un administrateur
        if (!isAdmin) {
            const error = "vous n'avez pas les autorisation requises" ;
            return res.render('home/Error', {error,pseudoUtilisateur});
        }
        const quiz = await Quiz.findByPk(idQuiz);

        if (!quiz) {
            const error = "Le quiz n'existe pas" ;
            return res.render('home/Error', {error,pseudoUtilisateur});
        }

        // Supprimer l'image existante de la base de données et du système de fichiers
        if (req.files && req.files.image) {
            const imagePath = quiz.image;

            // Supprimer l'image du système de fichiers
            await fs.unlink(path.join(__dirname, '../..', imagePath));

            // Mettre à jour le chemin de l'image dans la base de données avec le nouveau fichier
            quiz.image = req.files.image[0].path;
        }

        // Mettre à jour les autres champs du quiz
        quiz.titre = titre;
        quiz.description = description;
        quiz.id_categ = categorieId;

        // Enregistrer les modifications dans la base de données
        await quiz.save();

        // Rediriger ou renvoyer une réponse appropriée
        res.redirect('/profil');
    } catch (err) {
        console.error('Erreur lors de la modification du quiz :', err);
        const error = "Une erreur s'est produite lors de la modification" ;
        return res.render('home/Error', {error,pseudoUtilisateur});
    }
});

module.exports = router;
