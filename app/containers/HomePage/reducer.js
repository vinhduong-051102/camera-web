import produce from 'immer';
import {
  RESET_REDUX,
  GET_DATA_TABLE_1_SUCCESS,
  GET_DATA_TABLE_2_SUCCESS,
  TABLE_1_REQUEST_BEGIN,
  TABLE_2_REQUEST_BEGIN,
  TABLE_1_REQUEST_FALSE,
  TABLE_2_REQUEST_FALSE,
} from './constants';

export const initialState = {
  isLoadingTable1: false,
  isLoadingTable2: false,
  dataListForTable1: '',
  dataListForTable2: '',
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TABLE_1_REQUEST_BEGIN:
        draft.isLoadingTable1 = true;
        break;
      case TABLE_2_REQUEST_BEGIN:
        draft.isLoadingTable2 = true;
        break;
      case TABLE_1_REQUEST_FALSE:
        draft.isLoadingTable1 = false;
        break;
      case TABLE_2_REQUEST_FALSE:
        draft.isLoadingTable2 = false;
        break;
      case GET_DATA_TABLE_1_SUCCESS:
        draft.isLoadingTable1 = false;
        draft.dataListForTable1 = action.data;
        break;
      case GET_DATA_TABLE_2_SUCCESS:
        draft.isLoadingTable2 = false;
        draft.dataListForTable2 = action.data;
        break;
      case RESET_REDUX:
        draft.isLoadingTable1 = false;
        draft.isLoadingTable2 = false;
        draft.dataListForTable1 = '';
        draft.dataListForTable2 = '';
        break;
    }
  });

export default homePageReducer;
