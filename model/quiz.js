module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define('Quiz', {
    id_quiz: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notNull: { msg: 'L\'identifiant du quiz est requis.' }
      }
    },
    titre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: { msg: 'Le titre du quiz est requis.' },
        len: { args: [1, 30], msg: 'Le titre du quiz doit avoir entre 1 et 30 caractères.' }
      }
    },
    date_ajout: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notNull: { msg: 'La description du quiz est requise.' },
        len: { args: [100, 200], msg: 'La description du quiz doit avoir entre 100 et 200 caractères.' }
      }
    },
    image: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'utilisateur',
        key: 'id_user'
      },
      validate: {
        notNull: { msg: 'L\'identifiant de l\'utilisateur est requis.' }
      }
    },
    id_categ: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id_categ'
      },
      validate: {
        notNull: { msg: 'L\'identifiant de la catégorie est requis.' }
      }
    }
  }, {
    tableName: 'quiz', // Nom de la table dans la base de données
    timestamps: false // Désactiver l'ajout automatique des timestamps (created_at, updated_at)
  });

  Quiz.afterSync( async () => {
    try{
      const existingQuiz = await Quiz.findOne({where: {titre: 'Films des années 2000'}});
      if(!existingQuiz){
        Quiz.create({
          titre: 'Films des années 2000',
          description: `Testez vos connaissances cinématographiques avec notre quiz "Films des années 2000" ! Devinez les films emblématiques de cette décennie en un clin d'œil.`,
          id_user: 1,
          id_categ: 1,
          image:`public\\Images\\image-1713647299577.jpg`  
        })
      }}
      catch(error)
      {
        console.error('Erreur lors de la création du quiz: \n', error)
      }
    })

  return Quiz;
};
