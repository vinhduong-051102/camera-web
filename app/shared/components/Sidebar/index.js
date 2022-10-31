import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Grid } from 'antd';
import { StyledSidebar, StyledMenu } from './styles';
import * as selectors from '../Header/selectors';
import { REDUX_KEY } from '../../../utils/constants';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import { openSidebar } from '../Header/actions';

const { useBreakpoint } = Grid;

const Sidebar = () => {
  const screen = useBreakpoint();
  console.log('🚀 ~ file: index.js ~ line 19 ~ Sidebar ~ screen', screen);
  const dispatch = useDispatch();
  const key = REDUX_KEY.header;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const history = useHistory();
  const isOpenSidebar = useSelector(selectors.selectIsOpenSidebar());
  const [currPath, setCurrPath] = React.useState('');
  const items = [
    {
      key: 'danh-sach-san-pham',
      icon: (
        <img
          alt=""
          src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M12.92 2.26L19.43 5.77C20.19 6.18 20.19 7.35 19.43 7.76L12.92 11.27C12.34 11.58 11.66 11.58 11.08 11.27L4.57 7.76C3.81 7.35 3.81 6.18 4.57 5.77L11.08 2.26C11.66 1.95 12.34 1.95 12.92 2.26Z' stroke='%239B51E0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E %3Cpath d='M3.61 10.13L9.66 13.16C10.41 13.54 10.89 14.31 10.89 15.15V20.87C10.89 21.7 10.02 22.23 9.28 21.86L3.23 18.83C2.48 18.45 2 17.68 2 16.84V11.12C2 10.29 2.87 9.75999 3.61 10.13Z' stroke='%239B51E0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E %3Cpath d='M20.3904 10.13L14.3404 13.16C13.5904 13.54 13.1104 14.31 13.1104 15.15V20.87C13.1104 21.7 13.9804 22.23 14.7204 21.86L20.7704 18.83C21.5204 18.45 22.0004 17.68 22.0004 16.84V11.12C22.0004 10.29 21.1304 9.75999 20.3904 10.13Z' stroke='%239B51E0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E %3C/svg%3E"
        />
      ),
      label: 'Danh sách sản phẩm',
    },
    {
      key: 'danh-sach-hang-san-pham',
      icon: (
        <img
          alt=""
          src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M12.66 2.51814L12.63 2.58814L9.72996 9.31814H6.87996C6.19996 9.31814 5.54996 9.45814 4.95996 9.70814L6.70996 5.52814L6.74996 5.42814L6.81996 5.26814C6.83996 5.20814 6.85996 5.14814 6.88996 5.09814C8.19996 2.06814 9.67996 1.37814 12.66 2.51814Z' stroke='%23EB4747' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E %3Cpath d='M18.0505 9.51813C17.6005 9.37813 17.1205 9.31813 16.6405 9.31813H9.73047L12.6305 2.58813L12.6605 2.51813C12.8105 2.56813 12.9505 2.63813 13.1005 2.69813L15.3105 3.62813C16.5405 4.13813 17.4005 4.66813 17.9205 5.30813C18.0205 5.42813 18.1005 5.53813 18.1705 5.66813C18.2605 5.80813 18.3305 5.94813 18.3705 6.09813C18.4105 6.18813 18.4405 6.27813 18.4605 6.35813C18.7305 7.19813 18.5705 8.22813 18.0505 9.51813Z' stroke='%23EB4747' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E %3Cpath d='M21.5217 14.1984V16.1484C21.5217 16.3484 21.5117 16.5484 21.5017 16.7484C21.3117 20.2384 19.3617 21.9984 15.6617 21.9984H7.86172C7.62172 21.9984 7.38172 21.9784 7.15172 21.9484C3.97172 21.7384 2.27172 20.0384 2.06172 16.8584C2.03172 16.6284 2.01172 16.3884 2.01172 16.1484V14.1984C2.01172 12.1884 3.23172 10.4584 4.97172 9.70836C5.57172 9.45836 6.21172 9.31836 6.89172 9.31836H16.6517C17.1417 9.31836 17.6217 9.38836 18.0617 9.51836C20.0517 10.1284 21.5217 11.9884 21.5217 14.1984Z' stroke='%23EB4747' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E %3Cpath d='M6.71 5.52814L4.96 9.70814C3.22 10.4581 2 12.1881 2 14.1981V11.2681C2 8.42814 4.02 6.05814 6.71 5.52814Z' stroke='%23EB4747' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E %3Cpath d='M21.5186 11.2677V14.1977C21.5186 11.9977 20.0586 10.1277 18.0586 9.52766C18.5786 8.22766 18.7286 7.20766 18.4786 6.35766C18.4586 6.26766 18.4286 6.17766 18.3886 6.09766C20.2486 7.05766 21.5186 9.02766 21.5186 11.2677Z' stroke='%23EB4747' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E %3C/svg%3E"
        />
      ),
      label: 'Danh sách hãng sản xuất',
    },
  ];
  const handleClickMenuItem = item => {
    history.push(`/${item.key}`);
    if ((screen.md || screen.sm || screen.xs) && !(screen.xxl || screen.xl)) {
      dispatch(openSidebar());
    }
  };
  React.useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    const arr = location.href.split('/');
    setCurrPath(arr[3]);
    if (arr[3] === 'danh-sach-san-pham') {
      dispatch(actions.fetchDataProducts());
    } else {
      dispatch(actions.fetchDataProductLine());
    }
    // eslint-disable-next-line no-restricted-globals
  }, [location.href]);

  return (
    <div>
      <StyledSidebar
        collapsed={isOpenSidebar}
        collapsedWidth={screen.lg ? 80 : 0}
        width={screen.xxl || screen.xl ? 270 : '100vw'}
        reverseArrow={false}
      >
        <StyledMenu
          items={items}
          onClick={handleClickMenuItem}
          selectedKeys={[currPath]}
        />
      </StyledSidebar>
    </div>
  );
};

export default Sidebar;
