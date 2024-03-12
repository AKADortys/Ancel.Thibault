const express = require('express');
const router = express.Router();
const { Question, Reponse } = require('../../config/dbconnect');

router.post('/deleteQuest/:id' , async function (req,res) {

    const questId = req.params.id;

    if (!req.session.utilisateur) {
        return res.status(401).json({ message: 'Vous n\'êtes pas authentifié' });
    }

    const idUser = req.session.utilisateur.id_user;
    const isAdmin = req.session.utilisateur.admin;

    // Vérifier si l'utilisateur est un administrateur
    if (!isAdmin) {
        return res.status(403).json({ message: 'Vous n\'avez pas les autorisations nécessaires pour supprimer un quiz' });
    }
})