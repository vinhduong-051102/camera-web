import {
  takeLatest,
  put,
  call,
  debounce,
  delay,
  select,
} from 'redux-saga/effects';
import * as actions from './actions';
import * as constants from './constants';
import {
  axiosDelete,
  axiosGet,
  axiosPost,
  axiosPut,
} from '../../utils/request';
import {
  fetchDataProductsSuccess,
  getDataProductsSuccess,
} from '../../shared/components/Sidebar/actions';

import { selectProductsData } from '../../shared/components/Sidebar/selectors';

export function* preparePostProduct(action) {
  const body = { ...action.payload };
  const {
    name,
    description,
    image,
    id,
    price,
    discount,
    bonus,
    idBonusType,
    productLineId,
  } = body;
  const total = +price - (+price * +discount) / 100;
  const listImgFile = image;
  const imgApiPath = '/v1/image/product/upload';
  yield put(actions.begin());
  try {
    const listIdAvatar = [];
    for (let i = 0; i < listImgFile.length; i += 1) {
      const formData = new FormData();
      formData.append('file', listImgFile[0]);
      const res = yield call(axiosPost, imgApiPath, formData);
      const imageId = res.data.data.id;
      listIdAvatar.push(imageId);
    }
    const payload = {
      name,
      description,
      listIdAvatar,
      idBonusType: +idBonusType,
      discount: +discount,
      price: +price,
      bonus: +bonus,
      total,
      productLineId,
    };
    if (id) {
      yield put(actions.putProduct({ ...payload, id }));
    } else {
      yield put(actions.postProduct(payload));
    }
  } catch (err) {
    yield call(openDialog, 'error', err, 'Có lỗi xảy ra !!!');

    throw new Error(err);
  }
  yield put(actions.end());
}

export function* putProduct(action) {
  const body = action.payload;
  const path = '/v1/products';
  try {
    const res = yield call(axiosPut, path, body);
    if (res.status === 200) {
      yield put(fetchDataProductsSuccess());
      yield call(
        openDialog,
        'success',
        'Sửa thành công',
        'Cập nhập thành công !!!',
      );
    }
  } catch (err) {
    yield call(openDialog, 'error', err, 'Có lỗi xảy ra !!!');
    throw new Error(err);
  }
}

export function* postProduct(action) {
  const body = action.payload;
  const path = '/v1/products';
  try {
    const res = yield call(axiosPost, path, body);
    if (res.status === 200) {
      yield put(fetchDataProductsSuccess());
      yield call(
        openDialog,
        'success',
        'Thêm  thành công',
        'Cập nhập thành công !!!',
      );
    }
  } catch (err) {
    yield call(openDialog, 'error', err, 'Có lỗi xảy ra !!!');
    throw new Error(err);
  }
}

export function* searchProduct(action) {
  const dataProduct = yield select(selectProductsData());
  const body = action.payload;
  const isContainSearchName = dataProduct.some(
    item => item.name === body || body === '',
  );

  yield put(actions.begin());
  try {
    if (isContainSearchName) {
      const path = `/v1/products?currentPage=1&productLineId=00000000-0000-0000-0000-000000000000&name=${body}`;
      const res = yield call(axiosGet, path);
      if (res.data) {
        const rawData = res.data.data.response;
        yield put(getDataProductsSuccess(rawData));
      }
    } else {
      if (body === '') {
        yield put(fetchDataProductsSuccess());
      }
      yield put(getDataProductsSuccess([]));
    }
  } catch (error) {
    yield call(openDialog, 'error', error, 'Có lỗi xảy ra !!!');
    throw new Error(error);
  }
  yield put(actions.end());
}

export function* deleteProduct(action) {
  const body = action.payload;
  const path = `/v1/products/${body}`;
  yield put(actions.begin());
  try {
    const res = yield call(axiosDelete, path);
    if (res.status === 200) {
      yield put(fetchDataProductsSuccess());
      yield call(
        openDialog,
        'success',
        'Xóa thành công',
        'Cập nhập thành công !!!',
      );
    }
  } catch (err) {
    yield call(openDialog, 'error', err, 'Có lỗi xảy ra !!!');
    throw new Error(err);
  }
  yield put(actions.end());
}

export function* openDialog(type, message, description) {
  yield put(
    actions.openDialog({
      type,
      message,
      description,
    }),
  );
  yield delay(100);
  yield put(actions.openDialog({}));
}

export default function* watchFetchMonitor() {
  yield takeLatest(constants.ACTION_POST_PRODUCTS, postProduct);
  yield takeLatest(constants.ACTION_PUT_PRODUCTS_BY_ID, putProduct);
  yield takeLatest(constants.ACTION_PREPARE_POST_PRODUCTS, preparePostProduct);
  yield debounce(500, constants.ACTION_SEARCH_PRODUCTS_BY_ID, searchProduct);
  yield takeLatest(constants.ACTION_DELETE_PRODUCTS_BY_ID, deleteProduct);
}
