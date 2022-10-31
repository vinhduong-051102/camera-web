import produce from 'immer';
import { ACTION_END, ACTION_BEGIN } from './constants';

export const initialState = {
  isProcessing: false,
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ACTION_BEGIN:
        draft.isProcessing = true;
        break;
      case ACTION_END:
        draft.isProcessing = false;
        break;
    }
  });

export default homePageReducer;
