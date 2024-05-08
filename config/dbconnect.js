const { Sequelize, DataTypes } = require('sequelize');
const utilisateurModel = require('../model/utilisateur');
const categorieModel = require('../model/categorie');
const quizModel = require('../model/quiz');
const questionModel = require('../model/question');
const scoreModel = require('../model/score');
const reponseModel = require('../model/reponse');

//connexion a la BDD

const sequelize = new Sequelize(
   'QuizApp',
   'quizapp_user',
   'basicpwd',
   {
      host: 'localhost',
      dialect: 'mariadb',
      dialectOptions: {
         timezone: 'Etc/GMT-2'
      },
      logging: false
   }
);

sequelize.authenticate()
   .then(() => {
      console.log('Connecté à la base de données MySQL avec Sequelize');
   })
   .catch((err) => {
      console.error('Erreur de connexion à la base de données :', err);
   });

//syncronisation des modeles

const Utilisateur = utilisateurModel(sequelize, DataTypes);
const Categorie = categorieModel(sequelize, DataTypes);
const Quiz = quizModel(sequelize, DataTypes);
const Question = questionModel(sequelize, DataTypes);
const Score = scoreModel(sequelize, DataTypes);
const Reponse = reponseModel(sequelize, DataTypes);

sequelize.sync({ force: true })
   .then(() => {
      console.log('Modèles synchronisés avec la base de données');
   })
   .catch((err) => {
      console.error('Erreur lors de la synchronisation des modèles :', err);
   });

module.exports = { sequelize, Utilisateur, Categorie, Quiz, Question, Score, Reponse };
