const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const route = require('./routes/index');
const session = require('express-session');
const config = require('./config/dbconnect');
const { Sequelize,DataTypes } = require('sequelize');

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


// if actual user have an id he can reach the path he want. otherwise get redirected to login

// const verifyAuth = (req, res, next) => {
//   if (req.session.user) {
//     next();
//   } else {
  //     res.render('login/login');
  //   }
  // };
  
  app.use('/', route);
  
  
  //app port
  
  app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port http://localhost:${port}`);
  });
  