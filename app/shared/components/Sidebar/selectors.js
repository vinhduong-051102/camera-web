import { createSelector } from 'reselect';
import { REDUX_KEY } from 'utils/constants';
import { initialState } from './reducer';

export const selectSidebar = state => state[REDUX_KEY.header] || initialState;

export const selectData = () =>
  createSelector(
    selectSidebar,
    state => {
      console.log(state);
      const tableData = state.data.data.map((item, index) => {
        const { name, description, imagePath, createAt, id } = item;
        return {
          key: index,
          name,
          description,
          imagePath,
          createAt: new Date(createAt).toUTCString(),
          stt: index + 1,
          id,
        };
      });
      return tableData;
    },
  );
