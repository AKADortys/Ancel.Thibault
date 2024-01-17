module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Score', {
      id_score: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false
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
        }
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Utilisateur', 
          key: 'id_user'
        }
      }
    }, {
      tableName: 'score',
      timestamps: false
    });
  };
  