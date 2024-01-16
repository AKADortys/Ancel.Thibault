module.exports =(sequelize,DataTypes) => {
return sequelize.define('Utilisateur', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pwd: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    prenom: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    date_inscri: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'utilisateur',
    timestamps: false
})};

