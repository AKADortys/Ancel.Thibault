const mysql = require('mysql');

   const db = mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'QuizApp'
    });

db.connect((err) => {
   if (err) {
      console.error('Erreur de connexion à la base de données : ' + err.stack);
      return;
   }
   console.log('Connecté à la base de données MySQL en tant que id ' + db.threadId);
});

module.exports = db;
