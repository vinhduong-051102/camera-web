import produce from 'immer';
import { ACTION_LOGIN, ACTION_GET_ACCESS_TOKEN } from './constants';

export const initialState = {
  accessToken: '',
  username: '',
  password: '',
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ACTION_GET_ACCESS_TOKEN:
        draft.accessToken = action.payload;
        break;
      case ACTION_LOGIN:
        draft.username = action.payload.username;
        draft.password = action.payload.password;
        break;
    }
  });

export default loginPageReducer;
