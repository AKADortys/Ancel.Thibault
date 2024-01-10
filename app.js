const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const port = 3000;
const route = require('./routes/index')
const db = require('./config/dbconnect')

app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/', route);


app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
