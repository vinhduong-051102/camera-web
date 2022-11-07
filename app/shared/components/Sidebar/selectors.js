import { createSelector } from 'reselect';
import { REDUX_KEY } from 'utils/constants';
import { initialState } from './reducer';

export const selectSidebar = state => state[REDUX_KEY.header] || initialState;

export const selectProductLineData = () =>
  createSelector(
    selectSidebar,
    state => {
      const tableData = state.productLineData.map((item, index) => {
        const { name, description, imagePath, createAt, id } = item;
        const baseUrlImg = 'http://10.2.65.99:7777/api/v1/thumbnail/';
        return {
          key: index,
          name,
          description,
          imagePath: baseUrlImg.concat(imagePath),
          createAt: new Date(createAt).toUTCString(),
          stt: index + 1,
          id,
        };
      });

      return tableData;
    },
  );

export const selectProductsData = () =>
  createSelector(
    selectSidebar,
    state => {
      const tableData = state.productsData.map((item, index) => {
        const {
          name,
          description,
          listIdAvatar,
          id,
          price,
          discount,
          bonus,
          total,
          idBonusType,
          excellent,
        } = item;
        return {
          key: index,
          name,
          description,
          listIdAvatar,
          price,
          discount,
          bonus,
          total,
          stt: index + 1,
          id,
          idBonusType,
          excellent,
        };
      });
      return tableData;
    },
  );

export const selectListProductLineId = () =>
  createSelector(
    selectSidebar,
    state => state.listProductLineId,
  );
