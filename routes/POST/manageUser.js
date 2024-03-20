const express = require('express');
const router = express.Router();
const { Utilisateur } = require('../../config/dbconnect');
const bcrypt = require('bcrypt');

router.post('/manageUser/:id', async function (req, res) {
    try {
        if (!req.session.utilisateur) {
            return res.status(401).json({ message: 'Vous n\'êtes pas authentifié' });
        }

        const idUserSession = req.session.utilisateur.id_user;
        const idUser = req.params.id;
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
                    return res.send('Les mots de passe ne sont pas identiques !');
                }
                const hashedPassword = await bcrypt.hash(pwd, 10);
                formData.pwd = hashedPassword;
            }

            await Utilisateur.update(formData, { where: { id_user: idUser } });
            return res.redirect('/profil');
        } else {
            return res.status(403).send('Vous n\'avez pas les autorisations nécessaires pour effectuer cette action');
        }
    } catch (error) {
        console.error('Erreur lors de la modification', error);
        return res.status(500).send('Erreur lors de la modification');
    }
});

module.exports = router;
