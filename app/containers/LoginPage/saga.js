import { takeLatest, put, call } from 'redux-saga/effects';
import * as actions from './actions';
import * as constants from './constants';
import { axiosPost } from '../../utils/request';

export function* getAccessToken(accessToken) {
  yield put(actions.getAccessToken(accessToken));
}

export function* login(action) {
  const body = { ...action.payload };
  const path = '/v1/auth/login';
  yield put(actions.begin());
  try {
    const res = yield call(axiosPost, path, body);
    if (res.data) {
      yield call(getAccessToken, res.data.data.token);
    }
  } catch (err) {
    throw new Error(err);
  }

  yield put(actions.end());
}

export default function* watchFetchMonitor() {
  yield takeLatest(constants.ACTION_LOGIN, login);
}
