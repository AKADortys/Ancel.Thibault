const express = require('express');
const router = express.Router();
const { Reponse,Question } = require('../../config/dbconnect');

router.post('/QuestCreate', async function(req,res) {
    try {
        const {Intitule, difficulte, id_quiz, correct, rep1, rep2} = req.body;
        if(!req.session.utilisateur) {return res.status(401).json({ message: 'Vous n\'êtes pas identifié'});
    }

    const idUser = req.session.utilisateur.id_user;
    const isAdmin = req.session.utilisateur.admin;

    if (!isAdmin) {
        return res.status(403).json({ message: 'Vous n\'avez pas les autorisations nécessaires pour créer une question ' });
      }
  
      if (!Intitule) {
        return res.status(400).json({ message: 'Veuillez fournir un intitulé' });
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
            id_question :idQuestion
      });
      const newReponse1 = await Reponse.create({
            reponse: rep2,
            correct: false,
            id_question :idQuestion
      });
      const newReponse2 = await Reponse.create({
            reponse: rep1,
            correct: false,
            id_question :idQuestion
      });
      res.status(201).json({ message:'Nouvelle question créer avec succés !'}, newQuestion,newReponse,newReponse1,newReponse2)

    } catch (error) {
        console.error('Erreur lors de l\'insertion du quiz :', error);
    
        if (error.name === 'SequelizeValidationError') {
          return res.status(400).json({ error: 'Erreur de validation des données de la question' });
        }
    
        res.status(500).json({ error: 'Erreur lors de l\'insertion de la question' });
      }

});

module.exports = router;