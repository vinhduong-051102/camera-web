import {
  ACTION_POST_PRODUCTLINE,
  ACTION_END,
  ACTION_BEGIN,
  ACTION_PREPARE_POST_PRODUCT_LINE,
  ACTION_SEARCH_PRODUCT_LINE_BY_ID,
  ACTION_DELETE_PRODUCT_LINE_BY_ID,
  ACTION_PUT_PRODUCT_LINE_BY_ID,
  ACTION_OPEN_DIALOG,
} from './constants';

export const postProductLine = payload => ({
  type: ACTION_POST_PRODUCTLINE,
  payload,
});

export const begin = () => ({
  type: ACTION_BEGIN,
});

export const end = () => ({
  type: ACTION_END,
});

export const preparePostProductLine = payload => ({
  type: ACTION_PREPARE_POST_PRODUCT_LINE,
  payload,
});

export const searchProductLine = payload => ({
  type: ACTION_SEARCH_PRODUCT_LINE_BY_ID,
  payload,
});

export const deleteProductLine = payload => ({
  type: ACTION_DELETE_PRODUCT_LINE_BY_ID,
  payload,
});

export const putProductLine = payload => ({
  type: ACTION_PUT_PRODUCT_LINE_BY_ID,
  payload,
});

export const openDialog = payload => ({
  type: ACTION_OPEN_DIALOG,
  payload,
});
