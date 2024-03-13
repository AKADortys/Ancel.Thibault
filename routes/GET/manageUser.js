const express = require('express');
const router = express.Router();

const { Utilisateur } = require('../../config/dbconnect');

router.get('/manageUser/:id', async function (req, res) {

    if (!req.session.utilisateur) {
        return res.redirect('/userLogin');
    }
    const isAdmin = req.session.utilisateur.admin;

    // Vérifier si l'utilisateur est un administrateur
    if (!isAdmin) {
        return res.status(403).json({ message: 'Vous n\'avez pas les autorisations nécessaires pour accéder à ces informations' });
    }

    const userId = req.params.id;

    try {
        const utilisateur = await Utilisateur.findByPk(userId);


        const tableauUser = `<section>
                                <p>Identifiant:</p>
                                <p>${utilisateur.id_user}</p>
                                <p>Pseudo:</p>
                                <p>${utilisateur.pseudo}</p>
                                <p>Administrateur:</p>
                                <p>${utilisateur.admin}</p>
                                <p>Nom:</p>
                                <p>${utilisateur.nom}</p>
                                <p>Prénom:</p>
                                <p>${utilisateur.prenom}</p>
                                <p>Mail:</p>
                                <p>${utilisateur.mail}</p>
                                <p>Inscription:</p>
                                <p>${utilisateur.date_inscri}</p>
                            </section>`;

        let formUser = '';

        formUser += `<form method="POST" action="/manageUser/${utilisateur.id_user}">
                        <p>
                            <label for="pwd">Changer votre mot de passe:</label>
                            <input type="password" id="pwd" name="pwd">
                        </p>
                        <p>
                            <label for="pwdConf">Confirmer votre mot de passe</label>
                            <input type="password" id="pwdConf" name="pwdConf">
                        </p>
                        <p>                        
                            <label for="nom">Nom:</label>
                            <input type="text" name="nom" id="nom" value="${utilisateur.nom}"
                        </p>
                        <p>
                            <label for="prenom">Prenom:</label>
                            <input type="text" name="prenom" id="prenom" value="${utilisateur.prenom}"
                        </p>
                        <p>
                            <label for="mail">Mail:</label>
                            <input type="text" name="mail" id="mail" value="${utilisateur.mail}"
                        </p>
                        <p>
                            <label for="admin">Admin:</label>
                            <input type="checkbox" name="admin" id="admin" ${utilisateur.admin === true ? 'checked' : ''}>
                        </p>
                        <p>
                            <input type="submit" value="Confirmer les modifications">
                        </p>
                    </form>`;

        res.render('login/manageUser', {formUser, tableauUser})

    }

    catch (error) {

        console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
        res.status(500).send('Erreur lors de la récupération des informations de l\'utilisateur');
    }
});

module.exports = router;
