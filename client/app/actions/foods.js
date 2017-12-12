import { API_REQUEST, GET_FOODS } from 'constants/action-types';

export function getFoods() {
  return {
    type: API_REQUEST,
    payload: {
      url: '/foods',
      method: 'get',
      nextActionType: GET_FOODS
    }
  };
}
