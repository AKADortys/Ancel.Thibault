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
            unique: true,
            validate: {
                notNull: {
                    msg: 'La désignation est requise.'
                },
                len: {
                    args: [1, 30],
                    msg: 'La désignation doit avoir entre 1 et 30 caractères.'
                }
            }
        },
        description: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'La description est requise.'
                },
                len: {
                    args: [100, 200],
                    msg: 'La description doit avoir entre 100 et 200 caractères.'
                }
            }
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
