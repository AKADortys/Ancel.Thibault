const express = require('express');
const router = express.Router();
const { Utilisateur } = require('../../config/dbconnect');

router.get('/all-user', async function (req, res) {
  try {
    // Récupérer tous les utilisateurs depuis la base de données
    const utilisateurs = await Utilisateur.findAll();
        //recupérer le pseudo utilisateur pour la nav bar
        const pseudoUtilisateur = req.session.utilisateur.pseudo;

    if (utilisateurs.length === 0) {
      const error = "Il n'y a aucuns utilisateurs" ;
      return res.render('partials/Error', {error})
    }

    // Construire le tableau HTML
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

    res.render('login/all-user', { tableHtml, pseudoUtilisateur });
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);

    // Gérer les erreurs spécifiques,
    if (error.name === 'SequelizeDatabaseError') {
      return res.status(500).send('Erreur de base de données lors de la récupération des utilisateurs');
    }

    // Répondre avec un statut 500 (Erreur interne du serveur) pour les autres erreurs
    res.status(500).send('Erreur lors de la récupération des utilisateurs');
  }
});

module.exports = router;
