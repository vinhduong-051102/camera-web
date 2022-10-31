import { takeLatest, put, call } from 'redux-saga/effects';
import * as constants from './constants';
import * as actions from './actions';
import { axiosGet } from '../../../utils/request';

export function* getDataProductLine() {
  const path = 'http://10.2.65.99:7777/api/v1/product-line';
  try {
    const res = yield call(axiosGet, path);
    const rawData = res.data.data;
    const tableData = rawData.map((item, index) => {
      const { name, description, imagePath, createAt } = item;
      return {
        key: index,
        name,
        description,
        imagePath,
        createAt: new Date(createAt).toUTCString(),
        stt: index + 1,
      };
    });
    yield put(actions.getDataProductLine(tableData));
  } catch (error) {
    throw new Error(error);
  }
}

export function* getDataProducts() {
  console.log('anything');
}

export default function* watchFetchMonitor() {
  yield takeLatest(constants.FETCH_DATA_PRODUCTS, getDataProducts);
  yield takeLatest(constants.FETCH_DATA_PRODUCT_LINE, getDataProductLine);
}
