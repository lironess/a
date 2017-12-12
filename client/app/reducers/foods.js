import { GET_FOODS } from 'constants/action-types';

const initialState = [];

export const foods = (state = initialState, action) => {
  switch (action.type) {
    case GET_FOODS.success:
      return action.payload;
    default:
      return state;
  }
};
