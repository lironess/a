import Joi from 'joi';

export const addOrder = {
  auth: false,
  description: 'add new order',
  notes: 'add new order',
  tags: ['api', 'order'],
  validate: {
    payload: Joi.object({
      customerName: Joi.string().required(),
      foods: Joi.array().items(Joi.object({
        foodId: Joi.number().required(),
        amount: Joi.number().required()
      })).required()
    })
  },
  plugins: {
    'hapi-swagger': {
      responses: {
        200: {
          schema: Joi.object()
        }
      }
    }
  },
  handler: async (request, reply) => {
    const { models, sequelize } = request.getDb();
    const { order: OrderModel, order_foods } = models;
    const { customerName, foods } = request.payload;
    await sequelize.transaction(async (transaction) => {
      const order = await OrderModel.create({
        customerName
      }, { transaction, returning: true });
      return Promise.all(foods.map((food) => (
        order_foods.create({ orderId: order.id, ...food }, { transaction })
      )));
    });

    return reply({ success: true });
  }
};
