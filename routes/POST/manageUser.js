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

            console.log(mail, nom, prenom, admin);

            if (pwd !== pwdConf) {

                res.send('Les mots de passe ne sont pas identiques !')
            };

            if (admin === 'on') {
                admin = true;
            }
            else if (admin === undefined) {
                admin = false;
            };

            const hashedPassword = await bcrypt.hash(pwd, 10);
            const formData = {
                nom: nom,
                prenom: prenom,
                mail: mail,
                admin: admin
            };

            if(pwd)
            {formData.pwd = hashedPassword};

            await Utilisateur.update(formData, { where: { id_user: idUser } });

            res.redirect('/profil');
        }
    }

    catch (error) {

        console.error('Erreur lors de la modification', error);
        res.status(500).send('Erreur lors de la modification');
    }




}
);

module.exports = router;