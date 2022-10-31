import { createSelector } from 'reselect';
import { REDUX_KEY } from 'utils/constants';
import { initialState } from './reducer';

export const selectLoginPage = state =>
  state[REDUX_KEY.homePage] || initialState;

export const selectIsProcessing = () =>
  createSelector(
    selectLoginPage,
    state => state.isProcessing,
  );

export const selectImageId = () =>
  createSelector(
    selectLoginPage,
    state => state.imageId,
  );
