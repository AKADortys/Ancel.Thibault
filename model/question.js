module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Question', {
      id_question: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      Intitule: {
        type: DataTypes.STRING(300),
        allowNull: false,
        unique: true
      },
      difficulte: {
        type: DataTypes.INTEGER,
        allowNull: false
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
        }
      },
      id_quiz: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Quiz', 
          key: 'id_quiz'
        }
      }
    }, {
      tableName: 'question',
      timestamps: false
    });
  };
  