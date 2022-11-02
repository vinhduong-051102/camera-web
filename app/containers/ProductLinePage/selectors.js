import { createSelector } from 'reselect';
import { REDUX_KEY } from 'utils/constants';
import { initialState } from './reducer';

export const selectLoginPage = state =>
  state[REDUX_KEY.productLinePage] || initialState;

export const selectIsProcessing = () =>
  createSelector(
    selectLoginPage,
    state => state.isProcessing,
  );

export const selectDialogConfig = () =>
  createSelector(
    selectLoginPage,
    state => state.dialogConfig,
  );
