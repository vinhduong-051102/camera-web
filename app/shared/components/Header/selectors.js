import { createSelector } from 'reselect';
import { REDUX_KEY } from 'utils/constants';
import { initialState } from './reducer';

export const selectSidebar = state => state[REDUX_KEY.sidebar] || initialState;

export const selectIsOpenSidebar = () =>
  createSelector(
    selectSidebar,
    state => state.isOpenSidebar,
  );
