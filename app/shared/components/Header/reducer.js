import produce from 'immer';
import { ACTION_SIDEBAR_OPEN, ACTION_SIDEBAR_CLOSE } from './constants';

export const initialState = {
  isOpenSidebar: true,
};

/* eslint-disable default-case, no-param-reassign */
const headerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ACTION_SIDEBAR_OPEN:
        draft.isOpenSidebar = true;
        break;
      case ACTION_SIDEBAR_CLOSE:
        draft.isOpenSidebar = false;
        break;
    }
  });

export default headerReducer;
