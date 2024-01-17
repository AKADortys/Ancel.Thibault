const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {sequelize, Reponse,Question,Utilisateur,Categorie,Quiz,Score} = require('../config/dbconnect');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());

router.get('/home', function (req, res) {
    res.render('home/index');
});

router.get('/login', function (req, res) {
    res.render('login/login');
});

router.post('/sign-in', async (req, res) => {
    try {
      const { pseudo, pwd, admin, nom, prenom } = req.body;
  
      // Insérer un utilisateur dans la base de données
      const utilisateur = await Utilisateur.create({
        pseudo,
        pwd,
        admin,
        nom,
        prenom
      });
  
      res.status(201).json({ message: 'Utilisateur inséré avec succès', utilisateur });
    } catch (error) {
      console.error('Erreur lors de l\'insertion de l\'utilisateur :', error);
      res.status(500).json({ error: 'Erreur lors de l\'insertion de l\'utilisateur' });
    }
  });

  router.post('/loggin', async (req, res) => {
    try {
      const { pseudo, pwd } = req.body;
  
      // Récupérer l'utilisateur correspondant à l'identifiant unique (pseudo)
      const utilisateur = await Utilisateur.findOne({ where: { pseudo } });
  
      // Vérifier si l'utilisateur existe
      if (!utilisateur) {
        return res.status(401).json({ message: 'Identifiants invalides' });
      }
  
      // Comparer les mots de passe hachés
      const passwordMatch = await bcrypt.compare(pwd, utilisateur.pwd);
  
      if (passwordMatch) {
        // Les mots de passe correspondent, l'utilisateur est authentifié
        res.json({ message: 'Authentification réussie' });
      } else {
        // Les mots de passe ne correspondent pas, authentification échouée
        res.status(401).json({ message: 'Identifiants invalides' });
      }
    } catch (error) {
      console.error('Erreur lors de l\'authentification :', error);
      res.status(500).json({ error: 'Erreur lors de l\'authentification' });
    }
  });

module.exports = router;