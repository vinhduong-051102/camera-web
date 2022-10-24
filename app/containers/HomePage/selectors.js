import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { REDUX_KEY } from '../../utils/constants';

export function selectHomePage(state) {
  return state[REDUX_KEY.homePage] || initialState;
}

function selectLoadingTable1() {
  return createSelector(
    selectHomePage,
    function(state) {
      return state.isLoadingTable1;
    },
  );
}

const selectLoadingTable2 = () =>
  createSelector(
    selectHomePage,
    state => state.isLoadingTable2,
  );

const getDataListForTable1 = () =>
  createSelector(
    selectHomePage,
    state => state.dataListForTable1,
  );

const getDataListForTable2 = () =>
  createSelector(
    selectHomePage,
    state => state.dataListForTable2,
  );

export {
  selectLoadingTable1,
  selectLoadingTable2,
  getDataListForTable1,
  getDataListForTable2,
};
