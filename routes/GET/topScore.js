const express = require('express');
const router = express.Router();
const { Utilisateur, Score, Quiz, Question, Categorie } = require('../../config/dbconnect');
const CheckAuth = require('../../config/controller/CheckAuth');

router.get('/topScore/:idQuiz', CheckAuth, async function (req, res) {
    try {
        const idQuiz = req.params.idQuiz;
        const quiz = await Quiz.findByPk(idQuiz);
        const question = await Question.count({ where: {id_quiz: idQuiz} });
        const categQuiz = await Categorie.findByPk(quiz.id_categ);
        const userQuiz = await Utilisateur.findByPk(quiz.id_user);
        const maxPoint = await Question.sum('difficulte', { where: { id_quiz: idQuiz } })
        const pseudoUtilisateur = req.session.utilisateur.pseudo;

        const ordre = req.query.ordre || 'pseudo';

        let score;
        switch (ordre) {
            case 'pseudo':
                score = await Score.findAll({ where: { id_quiz: idQuiz }, order: [['id_user', 'ASC']] });
                break;
            case 'total':
                score = await Score.findAll({ where: { id_quiz: idQuiz }, order:[['total', 'ASC']]})
                break;
            case 'date':
                score = await Score.findAll({ where: {id_quiz: idQuiz}, order:[['MaJ','ASC']]})
                break;
            default:
                score = await Score.findAll({ where: { id_quiz: idQuiz } });
                break;
        }

        function FomateDate(d) {
            const objDate = new Date(d);
            return `${objDate.getDate().toString().padStart(2, '0')}/${(objDate.getMonth() + 1).toString().padStart(2, '0')}/${objDate.getFullYear()}`;
          }

        let objQuiz = 
        {
            titre: quiz.titre,
            description: quiz.description,
            date: FomateDate(quiz.date_ajout),
            image: quiz.image.substring(6),
            nomUser: userQuiz.pseudo,
            nomCateg: categQuiz.designation
        };
        

        let tableScore = [];
        for (const sco of score) {
            const utilisateur = await Utilisateur.findOne({ where: { id_user: sco.id_user } });
            
            let objTable = 
            {
                nomUser: utilisateur.pseudo,
                total: sco.total,
                date: FomateDate(sco.MaJ)
            }
            tableScore.push(objTable);
        };

        res.render('home/topScore',{tableScore, objQuiz, pseudoUtilisateur, question, idQuiz, maxPoint, ordre})
    }

    catch (error) {
        console.error('Erreur lors de la récupération des scores :', error);

        // Gérer les erreurs spécifiques, une erreur de base de données
        if (error.name === 'SequelizeDatabaseError') {
          return res.status(500).send('Erreur de base de données lors de la récupération des scores');
        }
    
        // Répondre avec un statut 500 (Erreur interne du serveur) pour les autres erreurs
        res.status(500).send('Erreur lors de la récupération des scores');
    }
})

module.exports = router;