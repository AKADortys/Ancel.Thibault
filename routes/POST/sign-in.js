const express = require('express');
const router = express.Router();
const { Utilisateur } = require('../../config/dbconnect');

router.post('/sign-in', async (req, res) => {
  try {
    const { pseudo, pwd,pwdConf, admin, nom, prenom, mail } = req.body;


    if(pwd !== pwdConf){
      const error = "Les mots de passes ne sont pas identiques" ;
      const pseudoUtilisateur ='';
      return res.render('home/Error', {error,pseudoUtilisateur});
    };

    // Vérifier si toutes les informations nécessaires sont fournies dans la requête
    if (!pseudo || !pwd  || !mail) {
      const error = "Veillez fournir les informations nécessaires" ;
      const pseudoUtilisateur ='';
      return res.render('home/Error', {error,pseudoUtilisateur});
    }

    // Créer un nouvel utilisateur dans la base de données
    const utilisateur = await Utilisateur.create({
      pseudo,
      pwd,
      mail,
      admin,
      nom,
      prenom
    });

    // Ajout des informations utilisateur dans la session
    req.session.utilisateur = utilisateur.dataValues;
    res.redirect('/home');

  } catch (err) {
    console.error('Erreur lors de l\'insertion de l\'utilisateur :', err);
    const error = "Erreur lors de l'inscription " ;
    const pseudoUtilisateur ='';
    return res.render('home/Error', {error,pseudoUtilisateur});
  }
});

module.exports = router;
