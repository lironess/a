import { forEach } from 'lodash';
import superagentPromisePlugin from 'superagent-promise-plugin';

const request = superagentPromisePlugin.patch(require('superagent'));

export const cleanQueryParams = (queryObject) => {
  const result = {};

  forEach(queryObject, (value, key) => {
    if (value !== null && value !== undefined && value !== '') {
      result[key] = value;
    }
  });

  return result;
};

export const http = (method, url, headers, data, query, files) => {
  let rawRequest = request[method](url).set(headers).withCredentials();

  if (data) {
    rawRequest = rawRequest.send(data);
  }
  if (query) {
    rawRequest = rawRequest.query(cleanQueryParams(query));
  }
  if (files) {
    forEach(files, (file, fileName) => rawRequest.attach(fileName, file));
  }

  return rawRequest;
};
