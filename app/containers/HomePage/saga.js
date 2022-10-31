import { takeLatest, put, call } from 'redux-saga/effects';
import * as actions from './actions';
import * as constants from './constants';
import { axiosPost } from '../../utils/request';

export function* postProductLine(action) {
  const body = { ...action.payload };
  const imgFile = body.image;
  const formData = new FormData();
  formData.append('file', imgFile);
  yield put(actions.begin());
  try {
    const res = yield call(postImageProductLine, formData);
    const imageId = res.data.data.id;
    const payload = { ...body, imageId };
    yield put(postInfo(payload));
  } catch (err) {
    throw new Error(err);
  }
  yield put(actions.end());
}

export function* postImageProductLine(formData) {
  const path = '/v1/image/product_line/upload';
  try {
    const res = yield call(axiosPost, path, formData);
    if (res.data !== null) {
      // yield put(actions.getImgProductLine(res.data.data.id));
    }
  } catch (err) {
    throw new Error(err);
  }
}

export function* postInfo(payload) {
  const path = '/v1/product-line';
  try {
    const res = yield call(axiosPost, path, payload);
    console.log(res);
  } catch (err) {
    throw new Error(err);
  }
}

export default function* watchFetchMonitor() {
  yield takeLatest(constants.ACTION_POST_PRODUCTLINE, postInfo);
  yield takeLatest(
    constants.ACTION_POST_IMG_PRODUCT_LINE,
    postImageProductLine,
  );
}
