import { createStore, applyMiddleware, compose } from 'redux';

import { root } from 'reducers/root';
import { APIMiddleware } from 'middlewares/api';

const middlewares = [
  APIMiddleware
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(root, composeEnhancers(applyMiddleware(...middlewares)));

export default store;
