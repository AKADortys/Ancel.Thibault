const mysql = require('mysql');

const connection = mysql.createConnection({
   host: 'localhost',
   user: 'thibault',
   password: 'eponge13.',
   database: 'quizapp'
});

connection.connect((err) => {
   if (err) {
      console.error('Erreur de connexion à la base de données : ' + err.stack);
      return;
   }
   console.log('Connecté à la base de données MySQL en tant que id ' + connection.threadId);
});

module.exports = connection;
