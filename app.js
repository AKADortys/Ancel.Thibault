const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const ejs = require('ejs');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get('/index', function(req, res) {
  res.render('pages/index');
});

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'standard_user',
  password: 'PWD',
  database: 'QuizApp'
});

db.connect((err) => {
  if (err) {
    console.log('Erreur de connexion à la base de données :', err);
  } else {
    console.log('Connexion à la base de données établie');
  }
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
