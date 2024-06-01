const express = require('express');
const router = express.Router();
const CheckAuth = require('../../config/controller/CheckAuth');
const {Categorie} = require('../../config/dbconnect');

router.post('/manageCateg/:id', CheckAuth, async function(req, res) {
const pseudoUtilisateur = req.session.utilisateur.pseudo;
    try{
        const idCateg = req.params.id;
        if(!idCateg){
            const error = "paramètres manquant(s)" ;
            return res.render('home/Error', {error,pseudoUtilisateur});
        }
        const formData = {
            designation: req.body.designation,
            description: req.body.description
        };
        const isAdmin = req.session.utilisateur.admin;
        // Vérifier si l'utilisateur est un administrateur
        if (!isAdmin) {
            const error = "Vous n'avez pas les autorisation requises" ;
            return res.render('home/Error', {error,pseudoUtilisateur});
        }
         await Categorie.update(formData,{where:{id_categ : idCateg}});

         res.redirect('/profil');

    } catch (err) {
        console.error('Erreur lors de la recherche de la catégorie :', err);
        const error = "Erreur lors de mise à jour de la categorie" ;
        return res.render('home/Error', {error,pseudoUtilisateur});
      }
});

module.exports = router;
