import { createSelector } from 'reselect';
import { REDUX_KEY } from 'utils/constants';
import { initialState } from './reducer';

export const selectLoginPage = state =>
  state[REDUX_KEY.loginPage] || initialState;

export const selectAccessToken = () =>
  createSelector(
    selectLoginPage,
    state => state.accessToken,
  );
