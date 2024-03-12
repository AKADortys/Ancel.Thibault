module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Score', {
    id_score: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notNull: { msg: 'L\'identifiant du score est requis.' }
      }
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'La valeur totale du score est requise.' },
        isInt: { msg: 'La valeur totale du score doit être un nombre entier.' },
        min: { args: [0], msg: 'La valeur totale du score doit être d\'au moins 0.' }
      }
    },
    MaJ: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    id_quiz: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Quiz',
        key: 'id_quiz'
      },
      validate: {
        notNull: { msg: 'L\'identifiant du quiz associé est requis.' }
      }
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
    }
  }, {
    tableName: 'score',
    timestamps: false
  });
};
