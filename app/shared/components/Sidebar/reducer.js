import produce from 'immer';
import { GET_DATA_PRODUCT_LINE, GET_DATA_PRODUCTS } from './constants';

export const initialState = {
  data: [],
};

/* eslint-disable default-case, no-param-reassign */
const sidebarReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_DATA_PRODUCT_LINE:
        draft.data = action.payload;
        break;
      case GET_DATA_PRODUCTS:
        draft.data = action.payload;
        break;
    }
  });

export default sidebarReducer;
