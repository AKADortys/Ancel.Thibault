module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Quiz', {
        id_quiz: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        titre: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        date_ajout: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        description: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'utilisateur',
                key: 'id_user'
            }
        },
        id_categ: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'categories',
                key: 'id_categ'
            }
        }
    }, {
        tableName: 'quiz', // Nom de la table dans la base de données
        timestamps: false // Désactiver l'ajout automatique des timestamps (created_at, updated_at)
    })
};