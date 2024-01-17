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
  secret: 'Keyboard cat',
  resave: false,
  saveUninitialized: true
}));

// Routes
app.use('/', require('./routes/index'));
app.use('/',require('./routes/post'));

// App port
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port http://localhost:${port}`);
});

module.exports = app;
