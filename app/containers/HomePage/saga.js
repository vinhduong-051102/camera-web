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
    yield put(postProductLine(payload));
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
      yield put(actions.getImgProductLine(res.data.data.id));
    }
  } catch (err) {
    throw new Error(err);
  }
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

// chinh lai state data trong homepage

export function* searchProductLine(action) {
  const body = action.payload;
  const path = 'http://10.2.65.99:7777/api/v1/product-line';
  yield put(actions.begin());
  try {
    const res = yield call(axiosGet, path, body);
    if (res.data) {
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
      yield put(getDataProductLine(tableData));
    }
  } catch (error) {
    throw new Error(error);
  }
  yield put(actions.end());
}

export default function* watchFetchMonitor() {
  yield takeLatest(constants.ACTION_POST_PRODUCTLINE, postProductLine);
  yield takeLatest(
    constants.ACTION_POST_IMG_PRODUCT_LINE,
    postImageProductLine,
  );
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
