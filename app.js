const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/index');
const session = require('express-session');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

//middle wares:

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
  secret: 'Keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use('/', route);

//app port

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port http://localhost:${port}`);
});
