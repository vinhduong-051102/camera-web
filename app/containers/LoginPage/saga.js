import { takeLatest, put, call } from 'redux-saga/effects';
import * as actions from './actions';
import * as constants from './constants';
import { axiosPost } from '../../utils/request';

export function* getAccessToken(accessToken) {
  yield put(actions.getAccessToken(accessToken));
}

export function* login(action) {
  const body = { ...action.payload };
  const path = 'http://10.2.65.99:7777/api/v1/auth/login';
  const res = yield call(axiosPost, path, body);
  if (res.data) {
    yield call(getAccessToken, res.data.data.token);
  }
}

export default function* watchFetchMonitor() {
  yield takeLatest(constants.ACTION_LOGIN, login);
}
