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


Jeu de Quiz :

La fonction startQuiz() propose une série de questions à l'utilisateur en fonction du quiz .
Pour mettre en place le système de questions dans l'application QuizApp et les étapes de la fonction startQuiz(), voici les étapes :

1. Récupération des paramètres de catégorie et de niveau de difficulté choisis par l'utilisateur.
2. Interrogation de la base de données pour récupérer les questions correspondantes à la catégorie et au niveau de difficulté sélectionnés.
3. Mélange aléatoire des questions pour rendre le quiz plus varié.
4. Affichage de chaque question une par une à l'utilisateur.
5. Gestion des réponses de l'utilisateur : récupération et validation.
6. Enregistrement du score de l'utilisateur
7. Affichage du score final à l'utilisateur à la fin du quiz.

Consultation des Scores :

Les utilisateurs peuvent consulter les scores des autres utilisateurs pour les quiz qu'ils ont terminés.
Administration (Réservé aux Admins) :

Les administrateurs peuvent ajouter, supprimer, et modifier des questions.
Ils peuvent également gérer les quizs et les catégories.

Contraintes Techniques :

Interface en HTML et stylisée en CSS.
API validée sur Node.js avec le framework Express.js.
Base de données MySQL
Accès sécurisé avec gestion des rôles (joueur, admin).
Utilisation de XAMPP server et PHPMyAdmin
Le projet est versionné sur GitHub avec un repo privé.

Modèle logique textuel :

utilisateur = (id_user INT, pseudo VARCHAR(50), pwd VARCHAR(50), admin LOGICAL, nom VARCHAR(50), prenom VARCHAR(50), date_inscri DATETIME);

categories = (id_categ INT, designation VARCHAR(50), description VARCHAR(200), date_ajout DATETIME, #id_user);

quiz = (id_quiz INT, titre VARCHAR(50), date_ajout DATETIME, description VARCHAR(200), #id_user, #id_categ);

question = (id_question INT, Intitule VARCHAR(300), difficulte INT, date_ajout DATETIME, #id_user, #id_quiz);

score = (id_score INT, total INT, MaJ DATETIME, #id_quiz, #id_user);

reponse = (id_reponse INT, reponse VARCHAR(100), correct LOGICAL, #id_question);


Script SQL :
`sql
CREATE TABLE utilisateur 
(
    id_user INTEGER PRIMARY KEY AUTOINCREMENT,
    pseudo VARCHAR(50) NOT NULL UNIQUE,
    pwd VARCHAR(100) NOT NULL,
    mail VARCHAR(255) UNIQUE,
    admin BINARY NOT NULL DEFAULT 0,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    date_inscri DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE categories 
(
    id_categ INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    designation VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(200) NOT NULL,
    date_ajout DATE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id_user INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES utilisateur(id_user)
);


CREATE TABLE quiz 
(
    id_quiz INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    titre VARCHAR(50) NOT NULL,
    date_ajout DATE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    description VARCHAR(200) NOT NULL,
    image VARCHAR(300),
    id_user INTEGER NOT NULL,
    id_categ INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES utilisateur(id_user),
    FOREIGN KEY (id_categ) REFERENCES categories(id_categ)
);


CREATE TABLE question 
(
    id_question INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    Intitule VARCHAR(300) NOT NULL UNIQUE,
    difficulte INTEGER NOT NULL,
    date_ajout DATE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id_user INTEGER NOT NULL,
    id_quiz INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES Utilisateur(id_user),
    FOREIGN KEY (id_quiz) REFERENCES Quiz(id_quiz)
);


CREATE TABLE score 
(
    id_score INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    total INTEGER NOT NULL,
    MaJ DATE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id_quiz INTEGER NOT NULL,
    id_user INTEGER NOT NULL,
    FOREIGN KEY (id_quiz) REFERENCES Quiz(id_quiz),
    FOREIGN KEY (id_user) REFERENCES Utilisateur(id_user)
);


CREATE TABLE reponse 
(
    id_reponse INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    reponse VARCHAR(100) NOT NULL,
    correct BINARY NOT NULL,
    id_question INTEGER NOT NULL,
    FOREIGN KEY (id_question) REFERENCES Question(id_question)
);
`


