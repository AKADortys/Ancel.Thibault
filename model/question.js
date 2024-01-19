module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Question', {
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
        min: { args: [1,3], msg: 'La difficulté doit être d\'au moins 1.' }
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
};
