import {
  ACTION_POST_PRODUCTLINE,
  ACTION_END,
  ACTION_BEGIN,
  ACTION_POST_IMG_PRODUCT_LINE,
  ACTION_GET_IMG_PRODUCT_LINE,
} from './constants';

export const postProductLine = payload => ({
  type: ACTION_POST_PRODUCTLINE,
  payload,
});

export const postImgProductLine = payload => ({
  type: ACTION_POST_IMG_PRODUCT_LINE,
  payload,
});

export const begin = () => ({
  type: ACTION_BEGIN,
});

export const end = () => ({
  type: ACTION_END,
});

export const getImgProductLine = payload => ({
  type: ACTION_GET_IMG_PRODUCT_LINE,
  payload,
});
