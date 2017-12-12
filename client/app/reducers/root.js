import { combineReducers } from 'redux';

import { foods } from 'reducers/foods';

export const root = combineReducers({
  foods
});
