const express = require('express');
const router = express.Router();
const { Question, Reponse } = require('../../config/dbconnect');
const CheckAuth = require('../../config/controller/CheckAuth');

router.post('/deleteQuest/:id', CheckAuth, async function (req, res) {
    const questId = req.params.id;
    const pseudoUtilisateur = req.session.utilisateur.pseudo;
    const idUser = req.session.utilisateur.id_user;
    const isAdmin = req.session.utilisateur.admin;

    // Vérifier si l'utilisateur est un administrateur
    if (!isAdmin) {
        const error = "Vous n'avez pas les autorisation pour supprimer une question" ;
        return res.render('home/Error', {error,pseudoUtilisateur});
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

    } catch (err) {
        console.error(err);
        const error = "Une erreur s'est produit lors de la suppression" ;
        return res.render('home/Error', {error,pseudoUtilisateur});
    }
});

module.exports = router;
