module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    id_question: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Intitule: {
      type: DataTypes.STRING(300),
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'L\'intitulé de la question est requis.' },
        len: { args: [1, 300], msg: 'L\'intitulé de la question doit avoir entre 1 et 300 caractères.' }
      }
    },
    difficulte: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'La difficulté de la question est requise.' },
        isInt: { msg: 'La difficulté doit être un nombre entier.' },
        min: { args: [1, 3], msg: 'La difficulté doit être d\'au moins 1.' }
        // Vous pouvez ajuster la valeur minimale selon vos besoins
      }
    },
    date_ajout: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Utilisateur',
        key: 'id_user'
      },
      validate: {
        notNull: { msg: 'L\'identifiant de l\'utilisateur est requis.' }
      }
    },
    id_quiz: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Quiz',
        key: 'id_quiz'
      },
      validate: {
        notNull: { msg: 'L\'identifiant du quiz est requis.' }
      }
    }
  }, {
    tableName: 'question',
    timestamps: false
  });
  Question.afterSync(async () => {
    // Insérer 5 questions après la synchronisation du modèle
    try {
      const existingQuestion = await Question.findOne({
        where: { id_user: 1 }
      })
      if (!existingQuestion) {
        await sequelize.models.Question.bulkCreate([
          {
            Intitule: `Question 1: Quel film des années 2000 a remporté l'Oscar du meilleur film en 2003 ?`,
            difficulte: 1,
            id_user: 1,
            id_quiz: 1
          },
          {
            Intitule: 'Question 2: Qui a réalisé le film "Inception", sorti en 2010 ?',
            difficulte: 2,
            id_user: 1,
            id_quiz: 1
          },
          {
            Intitule: `Question 3: Quel film d'animation des années 2000 met en scène des jouets prenant vie`,
            difficulte: 1,
            id_user: 1,
            id_quiz: 1
          },
          {
            Intitule: `Question 4: Quel acteur a joué le rôle principal dans le film "Pirates des Caraïbes : La Malédiction du Black Pearl" ?`,
            difficulte: 1,
            id_user: 1,
            id_quiz: 1
          },
          {
            Intitule: `Question 5: Quel film des années 2000 a été réalisé par Quentin Tarantino et met en scène une bande de braqueurs déguisés en super-héros ?`,
            difficulte: 3,
            id_user: 1,
            id_quiz: 1
          }

        ])
        console.log('5 questions insérées avec succès.');
      };
    } catch (error) {
      console.error('Erreur lors de l\'insertion des questions :', error);
    }
  });

  return Question;
};
