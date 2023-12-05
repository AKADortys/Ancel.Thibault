const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const config = require('./config');
const ejs = require('ejs');
const app = express();
const port = 3000;

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('index');
});

app.set('view engine', 'ejs');


// app.use(bodyParser.urlencoded({ extended: true }));

// const db = mysql.createConnection(config);
// db.connect((err) => {
//   if (err) {
//     console.error('Erreur de connexion à la base de données:', err);
//   } else {
//     console.log('Connecté à la base de données MySQL');
//   }
// });

// Définissez routes ici..

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
