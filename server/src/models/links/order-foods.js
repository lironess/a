module.exports = (sequelize, DataTypes) => {
  const OrderFoods = sequelize.define('order_foods', {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
  });

  const { food, order } = sequelize.models;
  OrderFoods.belongsTo(food, { as: 'foods', foreignKey: 'foodId' });
  OrderFoods.belongsTo(order, { as: 'order', foreignKey: 'orderId' });
  order.belongsToMany(food, {
    through: {
      model: OrderFoods,
      unique: false
    },
    foreignKey: 'orderId',
    otherKey: 'foodId'
  });

  return OrderFoods;
};
