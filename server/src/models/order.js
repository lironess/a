module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  return Order;
};
