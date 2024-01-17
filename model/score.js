// score.js
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
          model: 'Quiz', // Assurez-vous que le modèle Quiz est correctement défini
          key: 'id_quiz'
        }
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Utilisateur', // Assurez-vous que le modèle utilisateur est correctement défini
          key: 'id_user'
        }
      }
    }, {
      tableName: 'score',
      timestamps: false
    });
  };
  