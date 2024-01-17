// reponse.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Reponse', {
      id_reponse: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      reponse: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      correct: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      id_question: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Question', 
          key: 'id_question'
        }
      }
    }, {
      tableName: 'reponse',
      timestamps: false
    });
  };
  