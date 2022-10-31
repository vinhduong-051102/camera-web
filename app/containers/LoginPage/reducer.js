import produce from 'immer';
import {
  ACTION_LOGIN,
  ACTION_GET_ACCESS_TOKEN,
  ACTION_END,
  ACTION_BEGIN,
} from './constants';

export const initialState = {
  accessToken: '',
  username: '',
  password: '',
  isProcessing: false,
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
      case ACTION_BEGIN:
        draft.isProcessing = true;
        break;
      case ACTION_END:
        draft.isProcessing = false;
        break;
    }
  });

export default loginPageReducer;
