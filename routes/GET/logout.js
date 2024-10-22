const express = require('express');
const router = express.Router();
const CheckAuth = require('../../config/controller/CheckAuth');

router.get('/logout', CheckAuth, (req, res) => {
  // Supprimer la session
  req.session.destroy((err) => {
    if (err) {
      console.error('Erreur lors de la déconnexion :', err);
      const error = "Erreur lors de la déconnexion" ;
      return res.render('partials/Error', {error})
    } else {
      // Rediriger vers la page d'accueil ou une autre page après la déconnexion
      res.redirect('/home');
    }
  });
});

module.exports = router;
