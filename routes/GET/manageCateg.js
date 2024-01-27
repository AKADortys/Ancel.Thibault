const express = require('express');
const router = express.Router();
const {Categorie} =require('../../config/dbconnect')

router.get('/manageCateg/:id',async function(req,res) {
    const idCateg = req.params.id;
    
    if (!req.session.utilisateur) {
        return res.status(401).json({ message: 'Vous n\'êtes pas authentifié' });
    }
    const isAdmin = req.session.utilisateur.admin;

    // Vérifier si l'utilisateur est un administrateur
    if (!isAdmin) {
        return res.status(403).json({ message: 'Vous n\'avez pas les autorisations nécessaires pour supprimer un quiz' });
    }

    try{
        
    const categorie = await Categorie.findByPk(idCateg);

    if (!categorie) {
      return res.status(404).json({ message: 'La catégorie n\'existe pas' });
    }
    htmlCateg = `<table>
                    <tr>
                        <td>Nom catégorie :</td> <td>${categorie.designation}</td>
                    </tr>
                    <tr>
                        <td>Description :</td> <td>${categorie.description}</td>
                    </tr>
                </table>`;
    res.render('login/manageCateg',{htmlCateg});

    } catch (error) {
        console.error('Erreur lors de la recherche de la catégorie :', error);
        res.status(500).send('Erreur lors de la recherche de la catégorie');
      }
})

module.exports = router;