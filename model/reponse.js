module.exports = (sequelize, DataTypes) => {
  const Reponse = sequelize.define('Reponse', {
    id_reponse: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notNull: { msg: 'L\'identifiant de la réponse est requis.' }
      }
    },
    reponse: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: { msg: 'La réponse est requise.' },
        len: { args: [1, 100], msg: 'La réponse doit avoir entre 1 et 100 caractères.' }
      }
    },
    correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { msg: 'La valeur de correction de la réponse est requise.' },
        isIn: { args: [[true, false]], msg: 'La valeur de correction doit être soit true (correcte) soit false (incorrecte).' }
      }
    },
    id_question: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Question',
        key: 'id_question'
      },
      validate: {
        notNull: { msg: 'L\'identifiant de la question associée est requis.' }
      }
    }
  }, {
    tableName: 'reponse',
    timestamps: false
  });

  Reponse.afterSync( async () => {
    try{
      const existingReponse = await Reponse.findOne({
        where: {id_question:1}
      })
      if(!existingReponse){
      await sequelize.models.Reponse.bulkCreate([
        {
          reponse:`Le Seigneur des Anneaux : Le Retour du Roi`,
          correct:true,
          id_question:1
        },
        {
          reponse:`Gladiator`,
          correct:false,
          id_question:1
        },
        {
          reponse:`Titanic`,
          correct:false,
          id_question:1
        },
        {
          reponse:`Christopher Nolan`,
          correct:true,
          id_question:2
        },
        {
          reponse:`Steven Spielberg`,
          correct:false,
          id_question:2
        },
        {
          reponse:`Quentin Tarantino`,
          correct:false,
          id_question:2
        },
        {
          reponse:`Toy Story`,
          correct:true,
          id_question:3
        },
        {
          reponse:`Shrek`,
          correct:false,
          id_question:3
        },
        {
          reponse:`L'Âge de Glace`,
          correct:false,
          id_question:3
        },
        {
          reponse:`Johnny Depp`,
          correct:true,
          id_question:4
        },
        {
          reponse:`Brad Pitt`,
          correct:false,
          id_question:4
        },
        {
          reponse:`Tom Cruise`,
          correct:false,
          id_question:4
        },
        {
          reponse:`Kill Bill`,
          correct:true,
          id_question:5
        },
        {
          reponse:`Reservoir Dogs`,
          correct:false,
          id_question:5
        },
        {
          reponse:`Pulp Fiction`,
          correct:false,
          id_question:5
        },
      ])
    console.log('Reponses insérées avec succès !')
    }
    }
    catch(error){
      console.error('Erreur lors de la création des reponses: \n', error)
    }
  })

  return Reponse
};
