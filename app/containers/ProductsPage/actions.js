import {
  ACTION_POST_PRODUCTS,
  ACTION_END,
  ACTION_BEGIN,
  ACTION_PREPARE_POST_PRODUCTS,
  ACTION_SEARCH_PRODUCTS_BY_ID,
  ACTION_DELETE_PRODUCTS_BY_ID,
  ACTION_PUT_PRODUCTS_BY_ID,
  ACTION_OPEN_DIALOG,
  ACTION_DELETE_FILE,
} from './constants';

export const postProduct = payload => ({
  type: ACTION_POST_PRODUCTS,
  payload,
});

export const begin = () => ({
  type: ACTION_BEGIN,
});

export const end = () => ({
  type: ACTION_END,
});

export const preparePostProduct = payload => ({
  type: ACTION_PREPARE_POST_PRODUCTS,
  payload,
});

export const searchProducts = payload => ({
  type: ACTION_SEARCH_PRODUCTS_BY_ID,
  payload,
});

export const deleteProduct = payload => ({
  type: ACTION_DELETE_PRODUCTS_BY_ID,
  payload,
});

export const putProduct = payload => ({
  type: ACTION_PUT_PRODUCTS_BY_ID,
  payload,
});

export const openDialog = payload => ({
  type: ACTION_OPEN_DIALOG,
  payload,
});

export const deleteFile = payload => ({
  type: ACTION_DELETE_FILE,
  payload,
});
