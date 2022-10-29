import {
  GET_DATA_PRODUCT_LINE,
  GET_DATA_PRODUCTS,
  FETCH_DATA_PRODUCTS,
  FETCH_DATA_PRODUCT_LINE,
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
