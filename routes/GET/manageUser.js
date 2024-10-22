const express = require('express');
const router = express.Router();
const CheckAuth = require('../../config/controller/CheckAuth');
const { Utilisateur } = require('../../config/dbconnect');

router.get('/manageUser/:id', CheckAuth,async function (req, res) {
    const pseudoUtilisateur = req.session.utilisateur.pseudo;
    const isAdmin = req.session.utilisateur.admin;
    const idUserSession = req.session.utilisateur.id_user;
    const userId = req.params.id;
    if(!userId) {
        const error = "URL incomplète ou incorrecte" ;
        return res.render('home/Error', {error,pseudoUtilisateur})
    }
        //recupérer le pseudo utilisateur pour la nav bar


    // Vérifier si l'utilisateur est un administrateur ou qu'il s'agit de son profil
    if (userId == idUserSession || isAdmin){

        
        
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
            </p>`
            if(isAdmin){
                
             formUser += 
                `<p>
                    <label for="admin">Admin:</label>
                    <input type="checkbox" name="admin" id="admin" ${utilisateur.admin === true ? 'checked' : ''}>
                </p>`
        }
        formUser += `   <p>
                        <input type="submit" value="Confirmer les modifications">
                        </p>
                    </form>`;
            
            
            res.render('login/manageUser', {formUser, tableauUser, pseudoUtilisateur})
            
        }
        
        catch (err) {
            
            console.error('Erreur lors de la récupération des informations de l\'utilisateur :', err);
            const error = "Erreur lors de la récupération des données utilisateur" ;
            return res.render('home/Error', {error,pseudoUtilisateur})
        }
    }
    else{
        const error = "Vous n'avez pas les autorisations pour faire ça" ;
        return res.render('home/Error', {error,pseudoUtilisateur});
    }
});
    
    module.exports = router;
    