module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('food', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    pictureUrl: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  });

  const { comment } = sequelize.models;
  Food.hasMany(comment, { foreignKey: 'foodId' });

  return Food;
};
