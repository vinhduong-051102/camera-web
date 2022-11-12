import { takeLatest, put, call } from 'redux-saga/effects';
import * as constants from './constants';
import * as actions from './actions';
import { axiosGet } from '../../../utils/request';

export function* getDataProductLine() {
  const path = '/v1/product-line';
  yield put(actions.begin());
  try {
    const res = yield call(axiosGet, path);
    const { data } = res;
    if (data.data) {
      yield put(actions.getDataProductLineSuccess(data.data));
    }
  } catch (error) {
    throw new Error(error);
  }
  yield put(actions.end());
}

export function* getDataProducts(action) {
  const productLineId = action.payload;
  const currentPage = 1;
  let path = '';
  if (!productLineId) {
    path = `/v1/products?currentPage=${currentPage}&productLineId=00000000-0000-0000-0000-000000000000`;
  } else {
    path = `/v1/products?currentPage=${currentPage}&productLineId=${productLineId}`;
  }
  yield put(actions.begin());
  try {
    const res = yield call(axiosGet, path);
    const { data } = res.data;
    const { response } = data;
    const payload = [];
    for (let i = 0; i < response.length; i += 1) {
      // eslint-disable-next-line no-shadow
      const res = yield call(
        axiosGet,
        `http://10.2.65.99:7777/api/v1/products/${response[i].id}`,
      );
      // eslint-disable-next-line no-shadow
      const { data } = res.data;
      payload.push(data);
    }
    yield put(actions.getDataProductsSuccess(payload));
    const productLineRes = yield call(axiosGet, '/v1/product-line');
    if (productLineRes.data) {
      const listProductLineId = productLineRes.data.data.map(item => item.id);
      yield put(actions.getListProductLineId(listProductLineId));
    }
  } catch (error) {
    throw new Error(error);
  }
  yield put(actions.end());
}

export default function* watchFetchMonitor() {
  yield takeLatest(constants.ACTION_FETCH_DATA_PRODUCTS, getDataProducts);
  yield takeLatest(
    constants.ACTION_FETCH_DATA_PRODUCT_LINE,
    getDataProductLine,
  );
}
