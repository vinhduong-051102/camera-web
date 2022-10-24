import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosPost } from '../../utils/request';
import * as constants from './constants';
import * as actions from './actions';

export function* getDataForTable1(action) {
  yield put(actions.requestTable1Begin());
  const path = '/products/3';
  try {
    const res = yield call(axiosPost, path, action.body);
    yield put(actions.getDataTable1Success(res.data));
  } catch (error) {
    yield put(actions.requestTable1False(error));
  }
}

export function* getDataForTable2(action) {
  yield put(actions.requestTable2Begin());
  const path = '/products/3';
  try {
    const res = yield call(axiosPost, path, action.body);
    yield put(actions.getDataTable2Success(res.data));
  } catch (error) {
    yield put(actions.requestTable2False(error));
  }
}

export default function* watchFetchMonitor() {
  yield takeLatest(constants.GET_DATA_TABLE_1, getDataForTable1);
  yield takeLatest(constants.GET_DATA_TABLE_2, getDataForTable2);
}
