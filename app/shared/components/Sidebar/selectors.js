import { createSelector } from 'reselect';
import { REDUX_KEY } from 'utils/constants';
import { initialState } from './reducer';

export const selectSidebar = state => state[REDUX_KEY.header] || initialState;

export const selectData = () =>
  createSelector(
    selectSidebar,
    state => state.data,
  );
