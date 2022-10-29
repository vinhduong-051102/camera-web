import { ACTION_LOGIN, ACTION_GET_ACCESS_TOKEN } from './constants';

export const login = payload => ({
  type: ACTION_LOGIN,
  payload,
});

export const getAccessToken = accessToken => ({
  type: ACTION_GET_ACCESS_TOKEN,
  payload: accessToken,
});
