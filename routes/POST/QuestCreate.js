const express = require('express');
const router = express.Router();
const { Reponse, Question } = require('../../config/dbconnect');
const CheckAuth = require('../../config/controller/CheckAuth');


router.post('/QuestCreate', CheckAuth, async function (req, res) {
      const pseudoUtilisateur = req.session.utilisateur.pseudo;
      try {
            const { Intitule, difficulte, id_quiz, correct, rep1, rep2 } = req.body;
            const idUser = req.session.utilisateur.id_user;
            const isAdmin = req.session.utilisateur.admin;
            if (!Intitule || !difficulte || !id_quiz || !correct || !rep1 || !rep2) {
                  const error = "Veillez remplir tout les champs disponibles" ;
                  return res.render('home/Error', {error,pseudoUtilisateur});
            }
            

            if (!isAdmin) {
                  const error = "Vous n'avez pas les autorisation pour créer une question";
                  return res.render('home/Error', { error, pseudoUtilisateur });
            }

            if (!Intitule) {
                  const error = "Veillez fournir un intitulé";
                  return res.render('home/Error', { error, pseudoUtilisateur });
            }
            const newQuestion = await Question.create({
                  Intitule: Intitule,
                  difficulte: difficulte,
                  id_user: idUser,
                  id_quiz: id_quiz
            });
            const idQuestion = newQuestion.id_question;
            const newReponse = await Reponse.create({
                  reponse: correct,
                  correct: true,
                  id_question: idQuestion
            });
            const newReponse1 = await Reponse.create({
                  reponse: rep2,
                  correct: false,
                  id_question: idQuestion
            });
            const newReponse2 = await Reponse.create({
                  reponse: rep1,
                  correct: false,
                  id_question: idQuestion
            });
            console.log('Nouvelle question créer avec succés !');
            res.redirect('/profil');
      } catch (err) {
            console.error('Erreur lors de l\'insertion de la question :', err);
            const error = "Erreur lors de la création de la question";
            return res.render('home/Error', { error, pseudoUtilisateur });
      }

});

module.exports = router;
