import Joi from 'joi';

export const getFoods = {
  auth: false,
  description: 'get foods',
  notes: 'Get all foods',
  tags: ['api', 'foods'],
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
    const { food, comment } = request.getDb().models;
    const foods = await food.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: comment,
          attributes: { exclude: ['foodId', 'updatedAt'] }
        }
      ]
    });

    return reply(foods.map((_) => _.toJSON()));
  }
};

export const addComment = {
  auth: false,
  description: 'add new comment',
  notes: 'add new comment',
  tags: ['api', 'foods'],
  validate: {
    params: Joi.object({
      id: Joi.number().required()
    }).required(),
    payload: Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      customerName: Joi.string().required()
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
    const { comment } = request.getDb().models;
    await comment.create({
      foodId: request.params.id,
      ...request.payload
    });

    return reply({ success: true });
  }
};
