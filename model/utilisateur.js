const bcrypt = require('bcrypt');

// utilisateur.js
module.exports = (sequelize, DataTypes) => {
  const Utilisateur = sequelize.define('Utilisateur', {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    pwd: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
      defaultValue: sequelize.fn('NOW')
    }
  }, {
    tableName: 'utilisateur',
    timestamps: false
  });

  // Fonction pour hacher le mot de passe avant l'insertion
  Utilisateur.beforeCreate(async (utilisateur, options) => {
    const hashedPassword = await bcrypt.hash(utilisateur.pwd, 10);
    utilisateur.pwd = hashedPassword;
  });

  return Utilisateur;
};
