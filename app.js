const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Middlewares

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
  name: 'sid',
  secret: 'Keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: false
  }
}));


// Routes
app.use('/', require('./routes/GET/all-user'));
app.use('/', require('./routes/GET/home'));
app.use('/', require('./routes/GET/login'));
app.use('/', require('./routes/GET/logout'));
app.use('/', require('./routes/GET/profil'));
app.use('/', require('./routes/GET/quizcreate'));
app.use('/', require('./routes/GET/categcreate'));
app.use('/', require('./routes/GET/questioncreate'));
app.use('/', require('./routes/GET/manageCateg'));
app.use('/', require('./routes/GET/userLogin'));
app.use('/', require('./routes/POST/QuizCreate'));
app.use('/', require('./routes/POST/loggin'));
app.use('/', require('./routes/POST/sign-in'));
app.use('/', require('./routes/POST/CategCreate'));
app.use('/', require('./routes/POST/QuestCreate'));
app.use('/', require('./routes/POST/deleteCateg'));
app.use('/', require('./routes/POST/deleteQuiz'));
app.use('/', require('./routes/POST/manageCateg'));

// App port
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port http://localhost:${port}`);
});

module.exports = app;
