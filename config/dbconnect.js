const { Sequelize,DataTypes} = require('sequelize');
const utilisateurModel =require('../model/utilisateur')

const sequelize = new Sequelize(
   'QuizApp',
   'root',
   '',
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
   const Utilisateur = utilisateurModel(sequelize, DataTypes);

   sequelize.sync({ force: true })
     .then(() => {
       console.log('Modèles synchronisés avec la base de données');
     })
     .catch((err) => {
       console.error('Erreur lors de la synchronisation des modèles :', err);
     });

module.exports = sequelize;
