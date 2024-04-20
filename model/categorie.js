module.exports = (sequelize, DataTypes) => {
    const Categorie = sequelize.define('Categorie', {
        // Définition des attributs du modèle
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
            type: DataTypes.STRING(400),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'La description est requise.'
                },
                len: {
                    args: [100, 400],
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

    // Fonction pour insérer des données après la synchronisation réussie
    Categorie.afterSync(async () => {
        try {
            const existingCateg = await Categorie.findOne({where: {designation: 'Films'}});
            if(!existingCateg){
            Categorie.create({
                designation: 'Films',
                description: `Découvrez l'univers passionnant du cinéma à travers la catégorie Films de notre site de quiz. Testez vos connaissances sur les classiques, les blockbusters et les réalisateurs. Explorez les genres, les acteurs et les citations célèbres pour devenir un véritable cinéphile !`,
                id_user: 1 
            });
        }}
        catch(error)
        {
            console.error('Erreur lors de la création de la catégorie:\n',error)
        }
});

    return Categorie;
};