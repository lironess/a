import React from 'react';
import { Provider } from 'react-redux';

import store from 'store/index';
import Menu from 'components/menu';

export const App = () => (
  <Provider store={ store }>
    <div>
      Hello! this is our menu:
      <Menu />
    </div>
  </Provider>
);
