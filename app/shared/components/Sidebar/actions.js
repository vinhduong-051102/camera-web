import {
  GET_DATA_PRODUCT_LINE,
  GET_DATA_PRODUCTS,
  FETCH_DATA_PRODUCTS,
  FETCH_DATA_PRODUCT_LINE,
  ACTION_BEGIN,
  ACTION_END,
  ACTION_GET_LIST_PRODUCT_LINE_ID,
} from './constants';

export const getDataProductLine = data => ({
  type: GET_DATA_PRODUCT_LINE,
  payload: data,
});

export const getDataProducts = data => ({
  type: GET_DATA_PRODUCTS,
  payload: data,
});

export const fetchDataProducts = () => ({
  type: FETCH_DATA_PRODUCTS,
});

export const fetchDataProductLine = () => ({
  type: FETCH_DATA_PRODUCT_LINE,
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
