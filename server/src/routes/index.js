import { getFoods, addComment } from 'routes/food';
import { addOrder } from 'routes/order';

const register = (plugin, options, next) => {
  plugin.route([
    { method: 'GET', path: '/foods', config: getFoods },
    { method: 'POST', path: '/foods/{id}/comment', config: addComment },
    { method: 'POST', path: '/order', config: addOrder },
  ]);
  next();
};

register.attributes = {
  name: 'api'
};

export default register;
