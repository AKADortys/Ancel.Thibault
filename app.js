const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const port = 3000;
const db = require('./config/dbconnect');

app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

const session = require('express-session');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'Keyboard cat',
  resave: false,
  saveUninitialized: true
}));

const verifyAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

const route = require('./routes/index');
app.use('/',verifyAuth ,route);


app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
