import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { REDUX_KEY } from 'utils/constants';
// import loadingIcon from 'images/loading.svg';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import * as selectors from './selectors';
import {
  Container,
  ButtonContainer,
  DataContainer,
  // LoadingContainer,
} from './styles';
import TableCustom from '../../shared/components/Table';

const HomePage = () => {
  const key = REDUX_KEY.homePage;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const dispatch = useDispatch();
  const dataTable1Loading = useSelector(selectors.selectLoadingTable1());
  const dataTable2Loading = useSelector(selectors.selectLoadingTable2());
  const dataTable1 = useSelector(selectors.getDataListForTable1());
  const dataTable2 = useSelector(selectors.getDataListForTable2());

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Text',
      dataIndex: 'test',
      key: 'text',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];

  const getDataTable1 = () => {
    const body = {
      test: 'demo',
    };
    dispatch(actions.getDataTable1(body));
  };

  const getDataTable2 = () => {
    const body = {
      test: 'alex',
    };
    dispatch(actions.getDataTable2(body));
  };

  return (
    <Container>
      <ButtonContainer>
        <Button type="primary" onClick={getDataTable1}>
          Load Data Table 1
        </Button>
        <Button type="primary" onClick={getDataTable2}>
          Load Data Table 2
        </Button>
        <Button onClick={() => dispatch(actions.resetRedux())}>
          Reset Data
        </Button>
      </ButtonContainer>
      <DataContainer>
        <TableCustom
          columns={columns}
          data={[dataTable1]}
          isLoading={dataTable1Loading}
        />
        <TableCustom
          columns={columns}
          data={[dataTable2]}
          isLoading={dataTable2Loading}
        />
      </DataContainer>
    </Container>
  );
};

export default HomePage;
