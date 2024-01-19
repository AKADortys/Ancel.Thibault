module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Reponse', {
    id_reponse: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notNull: { msg: 'L\'identifiant de la réponse est requis.' }
      }
    },
    reponse: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: { msg: 'La réponse est requise.' },
        len: { args: [1, 100], msg: 'La réponse doit avoir entre 1 et 100 caractères.' }
      }
    },
    correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { msg: 'La valeur de correction de la réponse est requise.' },
        isIn: { args: [[true, false]], msg: 'La valeur de correction doit être soit true (correcte) soit false (incorrecte).' }
      }
    },
    id_question: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Question',
        key: 'id_question'
      },
      validate: {
        notNull: { msg: 'L\'identifiant de la question associée est requis.' }
      }
    }
  }, {
    tableName: 'reponse',
    timestamps: false
  });
};
