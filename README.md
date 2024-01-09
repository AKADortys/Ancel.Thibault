# Ancel.Thibault.TFE
Travail de fin d'études. ( application node.js qui interagie avec une BDD MySQL)

Pour ce projet, il vous est demandé de développer une application Node.js qui va interagir avec une base de données MySQL, le choix du projet est libre mais devra être validé au préalable par le chargé de cours.

Le projet que vous allez développer devra respecter les contraintes suivantes :

- Un accès sécurisé
- Le framework utilisé devra obligatoirement être **expressjs**
- Création d’au moins 2 fonctions qui seront utiles dans votre projet
- Interagir avec une base de données contenant au moins 3 tables
- Pouvoir consulter, modifier et supprimer des informations de la base de données via l’application
- Pouvoir effectuer des recherches sur une liste de données (formulaire de recherche).
- Utilisez au moins une expression régulière dans votre application
- Toutes les données envoyées via des formulaires devront être validées en Node.js
- Le projet devra être versionné sous git, stocké sur **github** (repo privé) et partagé avec le chargé de cours

L’application devra être remise au plus tard le mercredi 15 juin par email à l’adresse suivante : **samuel.lassoie@gmail.com**.

Description du Projet :

QuizApp est une application de jeu de quiz de culture générale où les utilisateurs peuvent tester leurs connaissances sur divers sujets. L'application offre une interface conviviale, des fonctionnalités d'inscription, de jeu, de suivi des scores, et d'administration.

Fonctionnalités Principales :

Inscription et Authentification :

Les utilisateurs peuvent créer un compte avec un pseudo, un mot de passe, et un grade (joueur ou admin).
L'authentification permet aux utilisateurs de se connecter à leur compte.

Classement des Scores :

Les scores des utilisateurs sont enregistrés à la fin de chaque quiz.
Un classement des 10 meilleurs scores est affiché sur la page d'accueil.

Quiz par Catégories :

Les questions sont classées par catégories (histoire, sciences, divertissement, etc.).
Chaque quiz est composé de questions en référence à leur catégorie respective.

Niveau de Difficulté :

Chaque question a un niveau de difficulté (easy, medium, hard).
Les utilisateurs peuvent choisir le niveau de difficulté de leur quiz.

Jeu de Quiz :

La fonction startQuiz() propose une série de questions à l'utilisateur en fonction de la catégorie et du niveau de difficulté choisis.
Un compte à rebours est lancé pour chaque question, et les utilisateurs répondent dans le temps imparti avec QCM (3 reponses 1 vraie).
Les réponses correctes sont confirmées, sinon la réponse correcte est affichée avant de passer à la question suivante.
Le score final est enregistré à la fin du quiz.

Consultation des Scores :

Les utilisateurs peuvent consulter les scores des autres utilisateurs pour les quiz qu'ils ont terminés.
Administration (Réservé aux Admins) :

Les administrateurs peuvent ajouter, supprimer, et modifier des questions.
Ils peuvent également gérer les quizs et les catégories.

Contraintes Techniques :

Interface en HTML et stylisée en CSS.
API validée sur Node.js avec le framework Express.js.
Base de données MySQL pour stocker les utilisateurs, les scores, les questions, etc.
Accès sécurisé avec gestion des rôles (joueur, admin).
Le projet est versionné sur GitHub avec un repo privé.

Modèle logique textuel :

utilisateur = (id_user INT, pseudo VARCHAR(50), pwd VARCHAR(50), admin LOGICAL, nom VARCHAR(50), prenom VARCHAR(50), date_inscri DATETIME);

categories = (id_categ INT, designation VARCHAR(50), description VARCHAR(200), #id_user);

quiz = (id_quiz INT, titre VARCHAR(50), date_ajout DATETIME, #id_user, #id_categ);

question = (id_question INT, Intitule VARCHAR(300), difficulte INT, date_ajout DATETIME, #id_user, #id_quiz);

score = (id_score INT, total INT, MaJ DATETIME, #id_quiz, #id_user);

reponse = (id_reponse INT, reponse VARCHAR(100), correct LOGICAL, #id_question);

Script SQL :

CREATE TABLE utilisateur(
   id_user INT,
   pseudo VARCHAR(50) NOT NULL,
   pwd VARCHAR(50) NOT NULL,
   admin LOGICAL NOT NULL,
   nom VARCHAR(50),
   prenom VARCHAR(50),
   date_inscri DATETIME NOT NULL,
   PRIMARY KEY(id_user)
);

CREATE TABLE categories(
   id_categ INT,
   designation VARCHAR(50) NOT NULL,
   description VARCHAR(200) NOT NULL,
   id_user INT NOT NULL,
   PRIMARY KEY(id_categ),
   UNIQUE(designation),
   FOREIGN KEY(id_user) REFERENCES utilisateur(id_user)
);

CREATE TABLE quiz(
   id_quiz INT,
   titre VARCHAR(50) NOT NULL,
   date_ajout DATETIME NOT NULL,
   id_user INT NOT NULL,
   id_categ INT NOT NULL,
   PRIMARY KEY(id_quiz),
   FOREIGN KEY(id_user) REFERENCES utilisateur(id_user),
   FOREIGN KEY(id_categ) REFERENCES categories(id_categ)
);

CREATE TABLE question(
   id_question INT,
   Intitule VARCHAR(300) NOT NULL,
   difficulte INT NOT NULL,
   date_ajout DATETIME NOT NULL,
   id_user INT NOT NULL,
   id_quiz INT NOT NULL,
   PRIMARY KEY(id_question),
   UNIQUE(Intitule),
   FOREIGN KEY(id_user) REFERENCES utilisateur(id_user),
   FOREIGN KEY(id_quiz) REFERENCES quiz(id_quiz)
);

CREATE TABLE score(
   id_score INT,
   total INT,
   MaJ DATETIME NOT NULL,
   id_quiz INT NOT NULL,
   id_user INT NOT NULL,
   PRIMARY KEY(id_score),
   FOREIGN KEY(id_quiz) REFERENCES quiz(id_quiz),
   FOREIGN KEY(id_user) REFERENCES utilisateur(id_user)
);

CREATE TABLE reponse(
   id_reponse INT,
   reponse VARCHAR(100) NOT NULL,
   correct LOGICAL NOT NULL,
   id_question INT NOT NULL,
   PRIMARY KEY(id_reponse),
   FOREIGN KEY(id_question) REFERENCES question(id_question)
);


