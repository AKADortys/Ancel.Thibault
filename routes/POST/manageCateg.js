const express = require('express');
const router = express.Router();
const CheckAuth = require('../../config/controller/CheckAuth');
const {Categorie} = require('../../config/dbconnect');

router.put('/manageCateg/:id', CheckAuth, async function(req, res) {

    const idCateg = req.params.id;
    const formData = {
        designation: req.body.designation,
        description: req.body.description
    };
    const isAdmin = req.session.utilisateur.admin;
    
    try{
        // Vérifier si l'utilisateur est un administrateur
        if (!isAdmin) {
            return res.status(403).json({ message: 'Vous n\'avez pas les autorisations nécessaires pour supprimer un quiz' });
        }
         await Categorie.update(formData,{where:{id_categ : idCateg}});

         res.redirect('/profil');

    } catch (error) {
        console.error('Erreur lors de la recherche de la catégorie :', error);
        res.status(500).send('Erreur lors de la recherche de la catégorie');
      }
});

module.exports = router;