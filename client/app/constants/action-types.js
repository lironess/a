const apiRequestActions = (name) => ({
  success: `${name}_SUCCESS`,
  error: `${name}_ERROR`,
  pending: `${name}_PENDING`
});

export const GET_FOODS = apiRequestActions('GET_FOODS');
export const API_REQUEST = 'API_REQUEST';
