const bcrypt = require('bcrypt');
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
      unique: true,
      validate: {
        notNull: { msg: 'Un pseudo est requis !' },
        len: { args: [3, 50], msg: 'Le pseudo doit avoir entre 3 et 50 caractères.' }
      }
    },
    pwd: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Un mot de passe est requis !' },
        len: { args: [6, 100], msg: 'Le mot de passe doit faire entre 6 et 100 caractères.' }
      }
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: { args: true, msg: 'L\'email fourni n\'est pas valide !' }
      }
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: true, // Autorise la valeur null
      validate: {
        is: { args: /^[a-zA-Z]+$/, msg: 'Le nom ne peut contenir que des lettres alphabétiques.' }
      }
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: true, // Autorise la valeur null
      validate: {
        is: { args: /^[a-zA-Z]+$/, msg: 'Le prénom ne peut contenir que des lettres alphabétiques.' }
      }
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
  Utilisateur.afterSync(async () => {
    try {
      const existingUser = await Utilisateur.findOne({ where: { pseudo: 'Admin' } });
      if (!existingUser) {
        await Utilisateur.create({
          pseudo: 'Admin',
          pwd: 'basicpwd',
          mail: null,
          admin: true,
          nom: null,
          prenom: null
        });
        console.log('Utilisateur "Admin" créé avec succès.');
      }
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur "Admin" :', error);
    }
  });

  return Utilisateur;
};
