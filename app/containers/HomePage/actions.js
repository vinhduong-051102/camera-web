import {
  ACTION_POST_PRODUCTLINE,
  ACTION_END,
  ACTION_BEGIN,
  ACTION_PREPARE_POST_PRODUCT_LINE,
  ACTION_SEARCH_PRODUCT_LINE_BY_ID,
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
