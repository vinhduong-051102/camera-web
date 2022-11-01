import { takeLatest, put, call, debounce } from 'redux-saga/effects';
import * as actions from './actions';
import * as constants from './constants';
import { axiosGet, axiosPost } from '../../utils/request';
import { getDataProductLine } from '../../shared/components/Sidebar/actions';

export function* preparePostProductLine(action) {
  const body = { ...action.payload };
  const imgFile = body.image;
  const formData = new FormData();
  const imgApiPath = '/v1/image/product_line/upload';
  formData.append('file', imgFile);
  yield put(actions.begin());
  try {
    const res = yield call(axiosPost, imgApiPath, formData);
    const imageId = res.data.data.id;
    const payload = { ...body, imageId };
    yield put(actions.postProductLine(payload));
  } catch (err) {
    throw new Error(err);
  }
  yield put(actions.end());
}

export function* postProductLine(action) {
  const body = action.payload;
  const path = '/v1/product-line';
  try {
    const res = yield call(axiosPost, path, body);
    console.log(res);
  } catch (err) {
    throw new Error(err);
  }
}

export function* searchProductLine(action) {
  const body = action.payload;
  const path = 'http://10.2.65.99:7777/api/v1/product-line';
  yield put(actions.begin());
  try {
    const res = yield call(axiosGet, path, body);
    if (res.data) {
      const rawData = res.data.data;
      yield put(getDataProductLine(rawData));
    }
  } catch (error) {
    throw new Error(error);
  }
  yield put(actions.end());
}

export default function* watchFetchMonitor() {
  yield takeLatest(constants.ACTION_POST_PRODUCTLINE, postProductLine);
  yield takeLatest(
    constants.ACTION_PREPARE_POST_PRODUCT_LINE,
    preparePostProductLine,
  );
  yield debounce(
    800,
    constants.ACTION_SEARCH_PRODUCT_LINE_BY_ID,
    searchProductLine,
  );
}
