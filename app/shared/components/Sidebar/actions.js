import {
  ACTION_GET_DATA_PRODUCT_LINE,
  ACTION_GET_DATA_PRODUCTS,
  ACTION_FETCH_DATA_PRODUCTS,
  ACTION_FETCH_DATA_PRODUCT_LINE,
  ACTION_BEGIN,
  ACTION_END,
  ACTION_GET_LIST_PRODUCT_LINE_ID,
} from './constants';

export const getDataProductLineSuccess = data => ({
  type: ACTION_GET_DATA_PRODUCT_LINE,
  payload: data,
});

export const getDataProductsSuccess = data => ({
  type: ACTION_GET_DATA_PRODUCTS,
  payload: data,
});

export const fetchDataProductsSuccess = payload => ({
  type: ACTION_FETCH_DATA_PRODUCTS,
  payload,
});

export const fetchDataProductLineSuccess = () => ({
  type: ACTION_FETCH_DATA_PRODUCT_LINE,
});

export const begin = () => ({
  type: ACTION_BEGIN,
});

export const end = () => ({
  type: ACTION_END,
});

export const getListProductLineId = payload => ({
  type: ACTION_GET_LIST_PRODUCT_LINE_ID,
  payload,
});
