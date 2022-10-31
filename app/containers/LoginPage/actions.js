import {
  ACTION_LOGIN,
  ACTION_GET_ACCESS_TOKEN,
  ACTION_END,
  ACTION_BEGIN,
} from './constants';

export const login = payload => ({
  type: ACTION_LOGIN,
  payload,
});

export const getAccessToken = accessToken => ({
  type: ACTION_GET_ACCESS_TOKEN,
  payload: accessToken,
});

export const begin = () => ({
  type: ACTION_BEGIN,
});

export const end = () => ({
  type: ACTION_END,
});
