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
  fetchDataProductLineSuccess,
  fetchDataProductsSuccess,
  getDataProductLineSuccess,
} from '../../shared/components/Sidebar/actions';
import { selectProductLineData } from '../../shared/components/Sidebar/selectors';

export function* preparePostProductLine(action) {
  const body = { ...action.payload };
  const { name, description, image, id } = body;
  const imgFile = image;
  const formData = new FormData();
  const imgApiPath = '/v1/image/product_line/upload';
  formData.append('file', imgFile);
  yield put(actions.begin());
  try {
    const res = yield call(axiosPost, imgApiPath, formData);
    const imageId = res.data.data.id;
    const payload = { name, description, imageId };
    if (id) {
      yield put(actions.putProductLine({ ...payload, id }));
    } else {
      yield put(actions.postProductLine(payload));
    }
  } catch (err) {
    throw new Error(err);
  }
  yield put(actions.end());
}

export function* putProductLine(action) {
  const body = action.payload;
  const path = '/v1/product-line';
  try {
    const res = yield call(axiosPut, path, body);
    if (res.status === 200) {
      yield put(fetchDataProductLineSuccess());
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

export function* postProductLine(action) {
  const body = action.payload;
  const path = '/v1/product-line';
  try {
    const res = yield call(axiosPost, path, body);
    if (res.status === 200) {
      yield put(fetchDataProductLineSuccess());
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

export function* searchProductLine(action) {
  const dataProductLine = yield select(selectProductLineData());
  const body = action.payload;
  const isContainSearchName = dataProductLine.some(
    item => item.name === body || body === '',
  );

  yield put(actions.begin());
  try {
    if (isContainSearchName) {
      const path = `/v1/product-line/?name=${body}`;
      const res = yield call(axiosGet, path, body);
      if (res.data) {
        const rawData = res.data.data;
        yield put(getDataProductLineSuccess(rawData));
      }
    } else {
      if (body === '') {
        yield put(fetchDataProductLineSuccess());
      }
      // const path = `/v1/product-line/${body}`;
      // const res = yield call(axiosGet, path, body);
      // if (res.data) {
      //   const rawData = res.data;
      //   yield put(getDataProductLineSuccess([rawData]));
      // }
      yield put(getDataProductLineSuccess([]));
    }
  } catch (error) {
    yield call(openDialog, 'error', error, 'Có lỗi xảy ra !!!');
    throw new Error(error);
  }
  yield put(actions.end());
}

export function* deleteProductLine(action) {
  const body = action.payload;
  const path = `/v1/product-line/${body}`;
  yield put(actions.begin());
  try {
    const listProductInProductLineIdRes = yield call(
      axiosGet,
      `/v1/products?currentPage=${1}&productLineId=${body}`,
    );
    const listProductInProductLineId =
      listProductInProductLineIdRes.data.data.response;

    // xóa các sản phẩm có trong product-line đang xóa

    for (let i = 0; i < listProductInProductLineId.length; i += 1) {
      const { id } = listProductInProductLineId[i];
      const res = yield call(axiosDelete, `/v1/products/${id}`);
      if (res.status === 200) {
        yield put(fetchDataProductsSuccess());
      }
    }

    // xóa product-line

    const res = yield call(axiosDelete, path);
    if (res.status === 200) {
      yield put(fetchDataProductLineSuccess());
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
  yield takeLatest(constants.ACTION_POST_PRODUCTLINE, postProductLine);
  yield takeLatest(constants.ACTION_PUT_PRODUCT_LINE_BY_ID, putProductLine);

  yield takeLatest(
    constants.ACTION_PREPARE_POST_PRODUCT_LINE,
    preparePostProductLine,
  );
  yield debounce(
    500,
    constants.ACTION_SEARCH_PRODUCT_LINE_BY_ID,
    searchProductLine,
  );
  yield debounce(
    500,
    constants.ACTION_SEARCH_PRODUCT_LINE_BY_ID,
    searchProductLine,
  );
  yield takeLatest(
    constants.ACTION_DELETE_PRODUCT_LINE_BY_ID,
    deleteProductLine,
  );
}
