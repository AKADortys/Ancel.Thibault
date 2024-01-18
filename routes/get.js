const express = require('express');
const router = express.Router();
const { Utilisateur } = require('../config/dbconnect');

router.get('/home', async function (req, res) {
  try {
    const utilisateurs = await Utilisateur.findAll();

    let tableHtml = '<table class=\'top10Modal-table\' >';
    tableHtml += '<tr><th>Pseudo</th><th>Nom</th><th>Prénom</th></tr>';

    utilisateurs.forEach(utilisateur => {
      tableHtml += `<tr>
                        <td>${utilisateur.pseudo}</td>
                        <td>${utilisateur.nom}</td>
                        <td>${utilisateur.prenom}</td>
                    </tr>`;
    });

    tableHtml += '</table>';

    res.render('home/index', { tableHtml });
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).send('Erreur lors de la récupération des utilisateurs');
  }
});

router.get('/login', function (req, res) {
  res.render('login/login');
});

router.get('/quizcreate', function (req,res) {
  res.render('login/usercreatequiz');
})

router.get('/all-user', async function (req, res) {
  try {
    const utilisateurs = await Utilisateur.findAll();

    let tableHtml = '<table class=\'top10Modal-table\' >';
    tableHtml += '<tr><th>Pseudo</th><th>Nom</th><th>Prénom</th></tr>';

    utilisateurs.forEach(utilisateur => {
      tableHtml += `<tr>
                        <td>${utilisateur.pseudo}</td>
                        <td>${utilisateur.nom}</td>
                        <td>${utilisateur.prenom}</td>
                    </tr>`;
    });

    tableHtml += '</table>';

    res.render('login/all-user', { tableHtml });
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).send('Erreur lors de la récupération des utilisateurs');
  }
});

module.exports = router;
