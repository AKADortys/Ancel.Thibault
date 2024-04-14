const express = require('express');
const router = express.Router();
const { Question, Reponse } = require('../../config/dbconnect');
const CheckAuth = require('../../config/script/CheckAuth');

router.post('/deleteQuest/:id', CheckAuth, async function (req, res) {
    const questId = req.params.id;
    const idUser = req.session.utilisateur.id_user;
    const isAdmin = req.session.utilisateur.admin;

    // Vérifier si l'utilisateur est un administrateur
    if (!isAdmin) {
        return res.status(403).json({ message: 'Vous n\'avez pas les autorisations nécessaires pour supprimer un quiz' });
    }

    try {
        const question = await Question.findByPk(questId);

        if (!question) {
            return res.status(404).json({ message: 'La question n\'existe pas' });
        }

        // Supprimer les réponses associées
        await Reponse.destroy({ where: { id_question: questId } });

        // Supprimer la question
        await question.destroy();

        return res.redirect('/profil');

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression de la question et des réponses' });
    }
});

module.exports = router;
