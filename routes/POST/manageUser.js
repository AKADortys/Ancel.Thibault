const express = require('express');
const router = express.Router();
const { Utilisateur } = require('../../config/dbconnect');
const bcrypt = require('bcrypt');
const CheckAuth = require('../../config/controller/CheckAuth');


router.post('/manageUser/:id', CheckAuth, async function (req, res) {
    const pseudoUtilisateur = req.session.utilisateur.pseudo;
    try {
        const idUserSession = req.session.utilisateur.id_user;
        const idUser = req.params.id;
    if(!idUser){
        const error = "paramètres invalides" ;
        return res.render('home/Error', {error,pseudoUtilisateur});
    }
        const isAdmin = req.session.utilisateur.admin;

        if (idUser == idUserSession || isAdmin) {
            let { pwd, pwdConf, nom, prenom, mail, admin } = req.body;

            const formData = {
                nom: nom,
                prenom: prenom,
                mail: mail,
            };

            // Vérification et ajout du champ admin
            if (admin === 'on') {
                formData.admin = true;
            } else {
                formData.admin = false;
            }

            // Vérification et ajout du champ pwd
            if (pwd !== '') {
                if (pwd !== pwdConf) {
                    const error = "les mots de passe ne sont pas identiques" ;
                    return res.render('home/Error', {error,pseudoUtilisateur});
                }
                const hashedPassword = await bcrypt.hash(pwd, 10);
                formData.pwd = hashedPassword;
            }

            await Utilisateur.update(formData, { where: { id_user: idUser } });
            return res.redirect('/profil');
        } else {
            const error = "Vous n'avez pas les autorisations requises" ;
            return res.render('home/Error', {error,pseudoUtilisateur});
        }
    } catch (err) {
        console.error('Erreur lors de la modification', err);
        const error = "Une erreur s'est produit lors de la modification" ;
        return res.render('home/Error', {error,pseudoUtilisateur});
    }
});

module.exports = router;
