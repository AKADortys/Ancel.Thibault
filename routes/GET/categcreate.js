const express = require('express');
const router = express.Router();
const CheckAuth = require('../../config/controller/CheckAuth');

router.get('/categcreate', CheckAuth, function (req,res) {
  try{
    const pseudoUtilisateur = req.session.utilisateur.pseudo;
  const isAdmin = req.session.utilisateur.admin;
  
  // Vérifier si l'utilisateur est un administrateur
  if (!isAdmin) {
    const error = 'Vous n\'avez pas les autorisations nécessaires pour modifier un quiz' ;
    return res.render('home/Error', {error,pseudoUtilisateur})
  }
      //recupérer le pseudo utilisateur pour la nav bar
      res.render('login/usercreatecateg',{pseudoUtilisateur});
    
  }
  catch (err) {
    console.error(err);
    const error = "Une erreur est survenue" ;
    return res.render('home/Error', {error,pseudoUtilisateur})
  }
  })
  

module.exports = router;