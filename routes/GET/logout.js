const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
  // Supprimer la session
  req.session.destroy((err) => {
    if (err) {
      console.error('Erreur lors de la déconnexion :', err);
      res.status(500).send('Erreur lors de la déconnexion');
    } else {
      // Rediriger vers la page d'accueil ou une autre page après la déconnexion
      res.redirect('/home');
    }
  });
});

module.exports = router;
