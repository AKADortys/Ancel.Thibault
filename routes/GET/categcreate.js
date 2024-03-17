const express = require('express');
const router = express.Router();

router.get('/categcreate', function (req,res) {
  if (!req.session.utilisateur) {
    return res.redirect('/userLogin');
}
const isAdmin = req.session.utilisateur.admin;

// Vérifier si l'utilisateur est un administrateur
if (!isAdmin) {
    return res.status(403).json({ message: 'Vous n\'avez pas les autorisations nécessaires pour modifier un quiz' });
}
    //recupérer le pseudo utilisateur pour la nav bar
    const pseudoUtilisateur = req.session.utilisateur.pseudo;
    res.render('login/usercreatecateg',{pseudoUtilisateur});
  })
  

module.exports = router;