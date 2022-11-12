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
          fileName: imagePath,
        };
      });

      return tableData;
    },
  );

export const selectProductsData = () =>
  createSelector(
    selectSidebar,
    state => {
      const baseUrlImg = 'http://10.2.65.99:7777/api/v1/thumbnail/';
      const tableData = state.productsData.map((item, index) => {
        const {
          name,
          description,
          id,
          price,
          discount,
          bonus,
          total,
          bonusTypeEntity,
          productLineId,
        } = item;
        const imageProductEntityList = item.imageProductEntityList.map(
          // eslint-disable-next-line no-shadow
          item => ({ ...item, path: baseUrlImg.concat(item.name) }),
        );
        return {
          key: index,
          name,
          description,
          price,
          discount,
          bonus,
          total,
          stt: index + 1,
          id,
          bonusTypeEntity,
          excellent: true,
          imageProductEntityList,
          productLineId,
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
