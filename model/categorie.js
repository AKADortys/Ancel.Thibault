module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Category', {
        id_categ: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        designation: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        date_ajout: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('NOW')
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'utilisateur',
                key: 'id_user'
            }
        }
    }, {
        tableName: 'categories', // Nom de la table dans la base de données
        timestamps: false
    });

};
