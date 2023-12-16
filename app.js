const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const config = require('./config');
const ejs = require('ejs');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get('/index', function(req, res) {
  res.render('pages/index');
});

// const dbs = mysql.createConnection(config);
// dbs.connect((err) => {
//   if (err) {
//     console.error('Erreur de connexion à la base de données:', err);
//   } else {
//     console.log('Connecté à la base de données MySQL');
//   }
// });
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.get('/utilisateurs', (req, res) => {
//   dbs.query('SELECT * FROM utilisateur', (err, results) => {
//      if (err) throw err;
//      res.json(results);
//   });
// });
// Define your routes here...

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
