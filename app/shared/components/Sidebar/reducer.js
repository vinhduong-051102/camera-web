import produce from 'immer';
import {
  GET_DATA_PRODUCT_LINE,
  GET_DATA_PRODUCTS,
  ACTION_END,
  ACTION_BEGIN,
  ACTION_GET_LIST_PRODUCT_LINE_ID,
} from './constants';

export const initialState = {
  isProcessing: false,
  productLineData: [],
  productsData: [],
  listProductLineId: [],
};

/* eslint-disable default-case, no-param-reassign */
const sidebarReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_DATA_PRODUCT_LINE:
        draft.productLineData = action.payload;
        break;
      case GET_DATA_PRODUCTS:
        draft.productsData = action.payload;
        break;
      case ACTION_END:
        draft.isProcessing = false;
        break;
      case ACTION_BEGIN:
        draft.isProcessing = true;
        break;
      case ACTION_GET_LIST_PRODUCT_LINE_ID:
        draft.listProductLineId = action.payload;
        break;
    }
  });

export default sidebarReducer;
