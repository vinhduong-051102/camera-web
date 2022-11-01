import produce from 'immer';
import { ACTION_END, ACTION_BEGIN, ACTION_OPEN_DIALOG } from './constants';

export const initialState = {
  isProcessing: false,
  dialogCofig: {},
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
      case ACTION_OPEN_DIALOG:
        draft.dialogCofig = action.payload;
    }
  });

export default homePageReducer;
