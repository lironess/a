import { get } from 'lodash';
import { createAction } from 'redux-actions';

import { http } from 'utils/http';
import { API_URL } from 'constants/configuration';

import { API_REQUEST } from 'constants/action-types';

export function APIMiddleware({ dispatch }) {
  const sendRequest = ({ action, throwError = false }) => {
    const nextType = action.payload.nextActionType;

    const pending = (requestKey) => {
      dispatch(createAction(
        nextType.pending,
        action,
        () => Object.assign({}, action.meta, { requestKey })
      )());
    };

    const success = (data) => {
      dispatch(createAction(nextType.success, action, () => action.meta)(data));
    };

    const error = (reason) => {
      dispatch(createAction(nextType.error, action, () => action.meta)(reason));
      if (throwError) {
        throw reason;
      }
    };

    const external = get(action, 'meta.external');
    const requestUrl = external ? action.payload.url : `${API_URL}${action.payload.url}`;
    const headers = {};
    const request = http(
      action.payload.method,
      requestUrl,
      headers,
      action.payload.data,
      action.payload.query,
      action.payload.files
    );

    pending();

    return request
      .then((response) => success(response.body || response.text))
      .catch(error);
  };

  return (next) => (action) => {
    switch (action.type) {
      case API_REQUEST: {
        next(action);

        return sendRequest({ action });
      }

      default:
        return next(action);
    }
  };
}
